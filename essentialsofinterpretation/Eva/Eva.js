const assert = require('assert');
const Environment = require('./Environment');
// console.log(typeof Environment);
class Eva {
    constructor() {
        this.globalEnv = new Environment({ // preinstalled k/v in global env
            'null': null,
            'true': true,
            'false': false,
        });
    }
    eval(exp, env=this.globalEnv) {// env argument is good idea for eval
        if(isNumber(exp)) {
            return exp;
        }
        if(isString(exp)){
            return exp.slice(1, -1);
        }
        if(exp[0] === '+'){
            return this.eval(exp[1], env) + this.eval(exp[2],env);
        }

        if(isVariableIdentifier(exp)){
            return env.lookup(exp);
        }
        const op = exp[0];
        switch(op) {
            case 'var': {
                const ret = env.define(exp[1],this.eval(exp[2]));
                return ret;
            }
            return;
            case 'begin': {
                let ans;
                let beginEnv = new Environment({}, env);// current env shall be parent
                for(var i=1;i<exp.length; i++) {
                    // console.log('exp[i]:', exp[i]);
                    ans = this.eval(exp[i], beginEnv);
                }
                // console.log(beginEnv);
                return ans;
            }
            case 'set': {
                return env.assign(exp[1],this.eval(exp[2], env));
            }
            return;
        }
        throw `Unimplemented: ${JSON.stringify(exp)}`;
    }
}

function isNumber(exp) {
    return typeof exp === 'number';
}
function isString(exp) {
    return typeof exp === 'string' && exp[0] == '"' && exp[exp.length-1] == '"';
}
function isVariableIdentifier(exp) {
    //+\-*/<>=
    return typeof exp === 'string' && /^[a-zA-Z0-9_]+$/.test(exp);
}
// Test driven development
const eva = new Eva();
assert.strictEqual(eva.eval(1), 1);
// double quoted strings
assert.strictEqual(eva.eval('"hello"'), 'hello');
assert.strictEqual(eva.eval(['+', 1, 5]), 6);

assert.strictEqual(eva.eval(['var', 'k', 11]), 11);
assert.strictEqual(eva.eval('k'), 11);

assert.strictEqual(eva.eval(['var','j','true']), true);
assert.strictEqual(eva.eval(['var', 'abc', ['+', 1, 2]]),3);

assert.strictEqual(eva.eval(['begin',  
    ['var','a1', 2],
    ['var', 'a2', 3], 
    ['+', 'a1', 'a2']
]), 5);

assert.strictEqual(eva.eval(['begin',
    ['begin',
        ['var', 'x', 20],
        'x'
    ]
]), 20);

assert.strictEqual(eva.eval(['begin',
    ['var', 'x', 10],
    ['begin',
        ['var', 'x', 20],
        'x'
    ],
    'x'
]), 10);

assert.strictEqual(eva.eval(['begin', 
    ['begin',
        ['var', 'r1', 20],
        ['begin',
            ['+', 100, 'r1']// outer lexical scope access
        ]
    ]
]), 120);

assert.strictEqual(
    eva.eval(
        ['begin',
            ['var', 'data', 1],
            ['begin',
                ['set', 'data', 100]
            ],
            'data'
        ]
    ),100
)

console.log('all assertions passed');