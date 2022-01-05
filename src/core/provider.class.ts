//
//
//
//

export function _typeFactory<T extends Object>(type: (new (...args: any[]) => T), ...args: any[]): T {
    return new type(...args);
}

export default function provider<T extends {new (...args: any[]): T}>() {

    class provider {

        private static _instance: T;
        private constructor() { };

        public static get Instance() {
            return this._instance || (this._instance = _typeFactory<T>({} as T));
        }

    }

    return provider

}