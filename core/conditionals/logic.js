"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notArray = exports.not = exports.or = exports.and = void 0;
const condition_class_1 = require("../condition.class");
const logging_1 = require("../logging");
const logger = logging_1.logging.getLogger('core.conditionals.logic');
class and extends condition_class_1.executable {
    constructor(first, ...remainder) {
        super();
        if (remainder.length > 0) {
            this._conditions = [first, ...remainder];
            this._conditionsType = 'executable<boolean>[]';
        }
        else {
            this._conditions = first;
            this._conditionsType = 'executable<boolean[]>';
        }
    }
    execute(args) {
        if (this._conditionsType == 'executable<boolean>[]') {
            // Build promise array
            let promiseArray = [];
            for (let condition of this._conditions) {
                promiseArray.push(condition.execute(args));
            }
            // Build return promise
            return new Promise((resolve, reject) => {
                Promise.all(promiseArray).then((results) => {
                    resolve(this.logic(results));
                });
            });
        }
        else {
            // this._conditionsType == 'executable<boolean[]>'
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                resolve(this.logic(yield this._conditions.execute(args)));
            }));
        }
    }
    logic(results) {
        // @ts-ignore
        if (results == true) {
            return true;
        }
        return results.reduce((previous, current) => previous && current);
    }
}
exports.and = and;
class or extends condition_class_1.executable {
    constructor(first, ...remainder) {
        super();
        if (remainder.length > 0) {
            this._conditions = [first, ...remainder];
            this._conditionsType = 'executable<boolean>[]';
        }
        else {
            // this._conditionsType == 'executable<boolean[]>'
            this._conditions = first;
            this._conditionsType = 'executable<boolean[]>';
        }
    }
    execute(args) {
        if (this._conditionsType == 'executable<boolean>[]') {
            // Build promise array
            let promiseArray = [];
            for (let condition of this._conditions) {
                promiseArray.push(condition.execute(args));
            }
            // Build return promise
            return new Promise((resolve, reject) => {
                Promise.all(promiseArray).then((results) => {
                    resolve(this.logic(results));
                });
            });
        }
        else {
            // this._conditionsType == 'executable<boolean[]>'
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                resolve(this.logic(yield this._conditions.execute(args)));
            }));
        }
    }
    logic(results) {
        return results.reduce((previous, current) => previous || current);
    }
}
exports.or = or;
class not extends condition_class_1.executable {
    constructor(rhs) {
        super();
        this._rhs = rhs;
    }
    execute(args) {
        return new Promise((resolve, reject) => {
            this._rhs.execute(args).then((result) => {
                resolve(!result);
            });
        });
    }
}
exports.not = not;
class notArray extends condition_class_1.executable {
    constructor(first, ...remainder) {
        super();
        if (remainder.length > 0) {
            this._conditions = [first, ...remainder];
            this._conditionsType = 'executable<boolean>[]';
        }
        else {
            this._conditions = first;
            this._conditionsType = 'executable<boolean[]>';
        }
    }
    execute(args) {
        if (this._conditionsType == 'executable<boolean>[]') {
            // Build promise array
            let promiseArray = [];
            for (let condition of this._conditions) {
                promiseArray.push(condition.execute(args));
            }
            // Build return promise
            return new Promise((resolve, reject) => {
                Promise.all(promiseArray).then((results) => {
                    resolve(this.logic(results));
                });
            });
        }
        else {
            // this._conditionsType == 'executable<boolean[]>'
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                resolve(this.logic(yield this._conditions.execute(args)));
            }));
        }
    }
    logic(results) {
        return results.map((value) => !value);
    }
}
exports.notArray = notArray;
