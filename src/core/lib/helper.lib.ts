export function OrDefault<T>(Arg: T | null | undefined, Default: T): T {
    return Arg ? Arg : Default;
}

export function OrFail<T>(Arg: T | null | undefined): T {
    if (Arg) return Arg;
    throw new Error("OrFail<T> resulted in fail!");
}

export interface textEllipsisOptions
{
    side : 'end' | 'start' | undefined | void | null,
    ellipsis: string | '...';
}

export function textEllipsis(str : string, maxLength : number, opts : textEllipsisOptions = { side: "end", ellipsis: "..." }) {
	if (str.length > maxLength) {
      switch (opts.side) {
        case "start":
          return opts.ellipsis + str.slice(-(maxLength - opts.ellipsis.length));
        case "end":
        default:
          return str.slice(0, maxLength - opts.ellipsis.length) + opts.ellipsis;
      }
    }
    return str;
}

export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

export function dynamicSort<T>(property: keyof T, sortOrder: number = 1) {
    return function (a: T,b: T) : number {
        var result = (getProperty(a, property) < getProperty(b, property)) ? -1 : (getProperty(a, property) > getProperty(b, property)) ? 1 : 0;
        return result * sortOrder;
    }
}