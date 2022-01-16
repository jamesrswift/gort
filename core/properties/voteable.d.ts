import { executableArguments } from '../condition.class';
declare const archived_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class archived extends archived_base {
}
declare const author_fullname_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class author_fullname extends author_fullname_base {
}
declare const author_patreon_flair_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class author_patreon_flair extends author_patreon_flair_base {
}
declare const can_gild_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class can_gild extends can_gild_base {
}
declare const can_mod_post_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class can_mod_post extends can_mod_post_base {
}
declare const downs_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class downs extends downs_base {
}
declare const gilded_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class gilded extends gilded_base {
}
declare const mod_note_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class mod_note extends mod_note_base {
}
declare const mod_reason_by_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class mod_reason_by extends mod_reason_by_base {
}
declare const mod_reason_title_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class mod_reason_title extends mod_reason_title_base {
}
declare const no_follow_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class no_follow extends no_follow_base {
}
declare const num_reports_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class num_reports extends num_reports_base {
}
declare const permalink_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class permalink extends permalink_base {
}
declare const saved_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class saved extends saved_base {
}
declare const score_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class score extends score_base {
}
declare const send_replies_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class send_replies extends send_replies_base {
}
declare const stickied_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class stickied extends stickied_base {
}
declare const subreddit_id_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class subreddit_id extends subreddit_id_base {
}
declare const subreddit_name_prefixed_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class subreddit_name_prefixed extends subreddit_name_prefixed_base {
}
declare const ups_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class ups extends ups_base {
}
export {};
