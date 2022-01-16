import { executableArguments } from '../condition.class';
declare const approved_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class approved extends approved_base {
}
declare const body_html_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class body_html extends body_html_base {
}
declare const body_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class body extends body_base {
}
declare const collapsed_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class collapsed extends collapsed_base {
}
declare const controversiality_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class controversiality extends controversiality_base {
}
declare const depth_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class depth extends depth_base {
}
declare const ignore_reports_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class ignore_reports extends ignore_reports_base {
}
declare const is_submitter_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class is_submitter extends is_submitter_base {
}
declare const link_id_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class link_id extends link_id_base {
}
declare const parent_id_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class parent_id extends parent_id_base {
}
declare const removed_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class removed extends removed_base {
}
declare const score_hidden_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class score_hidden extends score_hidden_base {
}
declare const spam_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class spam extends spam_base {
}
export {};
