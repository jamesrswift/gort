import Discord from 'discord.js';
export declare function OrDefault<T>(Arg: T | null | undefined, Default: T): T;
export declare function OrDefault_NonEmptyString(Arg: string | null | undefined, Default: string): string;
export declare function MessageEmbed_NoThrow(embed: Discord.MessageEmbed, name: string, value: string, inline?: boolean | undefined): Discord.MessageEmbed;
export declare function OrFail<T>(Arg: T | null | undefined): T;
export interface textEllipsisOptions {
    side: 'end' | 'start' | undefined | void | null;
    ellipsis: string | '...';
}
export declare function textEllipsis(str: string, maxLength: number, opts?: textEllipsisOptions): string;
export declare function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K];
export declare function dynamicSort<T>(property: keyof T, sortOrder?: number): (a: T, b: T) => number;
