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
exports.arrayIndexOf = exports.arrayConcat = exports.arrayPush = exports.arrayPop = exports.arrayIncludesAny = exports.arrayIncludes = void 0;
const condition_class_1 = require("../condition.class");
class arrayIncludes extends condition_class_1.executable {
    constructor(lhs, rhs) {
        super();
        this._lhs = lhs;
        this._rhs = rhs;
    }
    execute(args) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            resolve((yield this._lhs.execute(args)).includes(yield this._rhs.execute(args)));
        }));
    }
}
exports.arrayIncludes = arrayIncludes;
class arrayIncludesAny extends condition_class_1.executable {
    constructor(lhs, rhs) {
        super();
        this._lhs = lhs;
        this._rhs = rhs;
    }
    execute(args) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const haystack = yield this._lhs.execute(args);
            resolve((yield this._rhs.execute(args)).some((v) => haystack.includes(v)));
        }));
    }
}
exports.arrayIncludesAny = arrayIncludesAny;
class arrayPop extends condition_class_1.executable {
    constructor(lhs) {
        super();
        this._lhs = lhs;
    }
    execute(args) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const returnValue = (yield this._lhs.execute(args)).pop();
            if (returnValue != undefined)
                return resolve(returnValue);
            reject('Empty array in arrayPop<Type>');
        }));
    }
}
exports.arrayPop = arrayPop;
class arrayPush extends condition_class_1.executable {
    constructor(lhs, rhs) {
        super();
        this._lhs = lhs;
        this._rhs = rhs;
    }
    execute(args) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            resolve([
                ...(yield this._lhs.execute(args)),
                yield this._rhs.execute(args),
            ]);
        }));
    }
}
exports.arrayPush = arrayPush;
// export class arraySort<Type> extends executable<Type[]>{
class arrayConcat extends condition_class_1.executable {
    constructor(lhs, rhs) {
        super();
        this._lhs = lhs;
        this._rhs = rhs;
    }
    execute(args) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            resolve([
                ...(yield this._lhs.execute(args)),
                ...(yield this._rhs.execute(args)),
            ]);
        }));
    }
}
exports.arrayConcat = arrayConcat;
class arrayIndexOf extends condition_class_1.executable {
    constructor(lhs, rhs) {
        super();
        this._lhs = lhs;
        this._rhs = rhs;
    }
    execute(args) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            resolve((yield this._lhs.execute(args)).indexOf(yield this._rhs.execute(args)));
        }));
    }
}
exports.arrayIndexOf = arrayIndexOf;
// export class arrayCopyWithin<Type> extends executable<Type[]>{
// export class arrayFill<Type> extends executable<Type[]>{
// export class arrayShift<Type> extends executable<Type>{
// export class arraySort<Type> extends executable<Type[]>{
// export class arrayUnshift<Type> extends executable<Type[]>{
// export class arrayJoin<Type> extends executable<string>{
// export class arrayLastIndexOf<Type> extends executable<number>{
// export class arraySlice<Type> extends executable<Type[]>{
// export class arrayToString<Type> extends executable<string>{
// export class arrayToLocalString<Type> extends executable<string>{
