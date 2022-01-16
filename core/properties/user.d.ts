import { executableArguments, listable } from '../condition.class';
declare const comment_karma_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class comment_karma extends comment_karma_base {
}
declare const has_mod_mail_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class has_mod_mail extends has_mod_mail_base {
}
declare const has_subscribed_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class has_subscribed extends has_subscribed_base {
}
declare const has_verified_mail_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class has_verified_mail extends has_verified_mail_base {
}
declare const hide_from_robots_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class hide_from_robots extends hide_from_robots_base {
}
declare const is_employee_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class is_employee extends is_employee_base {
}
declare const is_gold_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class is_gold extends is_gold_base {
}
declare const is_mod_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class is_mod extends is_mod_base {
}
declare const link_karma_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class link_karma extends link_karma_base {
}
declare const pref_show_snoovatar_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class pref_show_snoovatar extends pref_show_snoovatar_base {
}
declare const verified_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class verified extends verified_base {
}
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
export declare class subredditHistory extends listable {
    constructor();
    execute(args: executableArguments): Promise<string[]>;
}
export {};
