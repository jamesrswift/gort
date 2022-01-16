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
exports.lessThanOrEquals = exports.greaterThanOrEquals = exports.lessThan = exports.greaterThan = exports.notequals = exports.equals = void 0;
const condition_class_1 = require("../condition.class");
//----------------------------------------------------------------------------------
//  Relational arithmetic operations
//----------------------------------------------------------------------------------
class relationalOperator extends condition_class_1.executable {
    constructor(lhs, rhs) {
        super();
        this._lhs = lhs;
        this._rhs = rhs;
    }
    execute(args) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            resolve(this._predicate(yield this._lhs.execute(args), yield this._rhs.execute(args)));
        }));
    }
}
class equals extends relationalOperator {
    _predicate(lhs, rhs) {
        return lhs == rhs;
    }
}
exports.equals = equals;
class notequals extends relationalOperator {
    _predicate(lhs, rhs) {
        return lhs != rhs;
    }
}
exports.notequals = notequals;
class greaterThan extends relationalOperator {
    _predicate(lhs, rhs) {
        return lhs > rhs;
    }
}
exports.greaterThan = greaterThan;
class lessThan extends relationalOperator {
    _predicate(lhs, rhs) {
        return lhs < rhs;
    }
}
exports.lessThan = lessThan;
class greaterThanOrEquals extends relationalOperator {
    _predicate(lhs, rhs) {
        return lhs >= rhs;
    }
}
exports.greaterThanOrEquals = greaterThanOrEquals;
class lessThanOrEquals extends relationalOperator {
    _predicate(lhs, rhs) {
        return lhs <= rhs;
    }
}
exports.lessThanOrEquals = lessThanOrEquals;
