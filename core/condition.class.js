"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.legible = exports.listable = exports.countable = exports.conditional = exports.executable = void 0;
class executable {
    constructor(value) {
        this._value = value;
    }
    execute(args) {
        if (this._value == undefined)
            return Promise.reject('Undefined generic value in executable<Type>');
        return Promise.resolve(this._value);
    }
}
exports.executable = executable;
class conditional extends executable {
}
exports.conditional = conditional;
class countable extends executable {
}
exports.countable = countable;
class listable extends executable {
}
exports.listable = listable;
class legible extends executable {
}
exports.legible = legible;