"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicSort = exports.getProperty = exports.textEllipsis = exports.OrFail = exports.OrDefault = void 0;
function OrDefault(Arg, Default) {
    return (Arg != null && Arg != undefined) ? Arg : Default;
}
exports.OrDefault = OrDefault;
function OrFail(Arg) {
    if (Arg)
        return Arg;
    throw new Error('OrFail<T> resulted in fail!');
}
exports.OrFail = OrFail;
function textEllipsis(str, maxLength, opts = { side: 'end', ellipsis: '...' }) {
    if (str.length > maxLength) {
        switch (opts.side) {
            case 'start':
                return (opts.ellipsis +
                    str.slice(-(maxLength - opts.ellipsis.length)));
            case 'end':
            default:
                return (str.slice(0, maxLength - opts.ellipsis.length) +
                    opts.ellipsis);
        }
    }
    return str;
}
exports.textEllipsis = textEllipsis;
function getProperty(o, propertyName) {
    return o[propertyName]; // o[propertyName] is of type T[K]
}
exports.getProperty = getProperty;
function dynamicSort(property, sortOrder = 1) {
    return function (a, b) {
        var result = getProperty(a, property) < getProperty(b, property)
            ? -1
            : getProperty(a, property) > getProperty(b, property)
                ? 1
                : 0;
        return result * sortOrder;
    };
}
exports.dynamicSort = dynamicSort;
