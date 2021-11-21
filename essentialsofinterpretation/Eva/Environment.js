
module.exports = class Environment {
    constructor(record = {}, parentEnv = null){
        this.record = record;
        this.parentEnv = parentEnv;
    }

    define(name, value) {
        this.record[name]= value;
        return value;
    }

    assign(name, value) {
        this.resolveEnv(name).record[name] = value;
        return value;
    }

    lookup(name) {
        return this.resolveEnv(name).record[name];
    }

    resolveEnv(name) {
        if(this.record.hasOwnProperty(name)){
            return this;
        }
        if(this.parentEnv == null) {
            throw new ReferenceError("Cannot find in env");
        }
        return this.parentEnv.resolveEnv(name);
    }
}