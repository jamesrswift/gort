import { executableArguments } from '../condition.class';
declare const created_utc_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class created_utc extends created_utc_base {
}
declare const created_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class created extends created_base {
}
declare const id_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class id extends id_base {
}
declare const name_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class name extends name_base {
}
export {};
