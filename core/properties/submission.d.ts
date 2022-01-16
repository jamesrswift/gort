import { executableArguments } from '../condition.class';
declare const contest_mode_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class contest_mode extends contest_mode_base {
}
declare const domain_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class domain extends domain_base {
}
declare const hidden_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class hidden extends hidden_base {
}
declare const hide_score_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class hide_score extends hide_score_base {
}
declare const is_crosspostable_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class is_crosspostable extends is_crosspostable_base {
}
declare const is_meta_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class is_meta extends is_meta_base {
}
declare const is_original_content_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class is_original_content extends is_original_content_base {
}
declare const is_reddit_media_domain_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class is_reddit_media_domain extends is_reddit_media_domain_base {
}
declare const is_robot_indexable_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class is_robot_indexable extends is_robot_indexable_base {
}
declare const is_self_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class is_self extends is_self_base {
}
declare const is_video_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class is_video extends is_video_base {
}
declare const locked_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class locked extends locked_base {
}
declare const media_only_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class media_only extends media_only_base {
}
declare const num_comments_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class num_comments extends num_comments_base {
}
declare const num_crossposts_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class num_crossposts extends num_crossposts_base {
}
declare const over_18_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class over_18 extends over_18_base {
}
declare const parent_whitelist_status_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class parent_whitelist_status extends parent_whitelist_status_base {
}
declare const pinned_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class pinned extends pinned_base {
}
declare const pwls_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class pwls extends pwls_base {
}
declare const post_hint_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class post_hint extends post_hint_base {
}
declare const quarantine_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class quarantine extends quarantine_base {
}
declare const selftext_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class selftext extends selftext_base {
}
declare const spoiler_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class spoiler extends spoiler_base {
}
declare const subreddit_subscribers_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class subreddit_subscribers extends subreddit_subscribers_base {
}
declare const thumbnail_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class thumbnail extends thumbnail_base {
}
declare const title_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class title extends title_base {
}
declare const upvote_ratio_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class upvote_ratio extends upvote_ratio_base {
}
declare const url_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class url extends url_base {
}
declare const visited_base: {
    new (): {
        execute(args: executableArguments): Promise<boolean>;
        _value?: boolean | undefined;
    };
};
export declare class visited extends visited_base {
}
declare const whitelist_status_base: {
    new (): {
        execute(args: executableArguments): Promise<string>;
        _value?: string | undefined;
    };
};
export declare class whitelist_status extends whitelist_status_base {
}
declare const wls_base: {
    new (): {
        execute(args: executableArguments): Promise<number>;
        _value?: number | undefined;
    };
};
export declare class wls extends wls_base {
}
export {};
