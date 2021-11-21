
`Expression` `eval`uate to a `value`, under an `env`ironment

### Core API

Core api is usually an `eval` function, that takes in a program and returns a value.
Eval when does not get environment, by default uses global environment.
* Core api:
`eval: (program, env) => value`

### AST interpretation/eval

Should be recursive, children if an AST, should be recursively `eval`ed.

### Managing variables in interpreter

Variables introduce a concept of `environment`

`Environment`: a repository of variables and functions defined in a scope. 

#### Environment

`Environment Record`: lookup table of key/value pairs
`Environment can be linked to parent environment`.

API for environment:
1. define a variable
2. assign a new value to variable
3. Lookup a variable


#### VariableDeclaration

Usually starts with keyword like `var` or `let` or `set` followed by an `identifier` and a `value`
e.g. `(var id valueOrExpression)`
**Note**: valueOrExpression can be a simple value or a complex subExpression that needs to be `eval`ed first.

#### Variable Assignment Express

`(set id valueOrExpression)`
Difference from declaration: variable assignment will do variable/identifier
resolution first and then assign to that

#### VariableAccess

Variable lookup also known as identifier resolution.
takes an ide and returns a value
`(get id)` returns value


### Block Scope

New environment created on block enter.


### Block Expression

A grouping of expression, and the return value of the block
expression is the return value of the last expression.

Evaluation inside a block, happens in this newly introduced environment.

```
(begin
    (exp1)
    (exp2)
)
```