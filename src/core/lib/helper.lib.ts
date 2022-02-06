import Discord from 'discord.js';

export function OrDefault<T>(Arg: T | null | undefined, Default: T): T {
	return ( Arg != null && Arg != undefined) ? Arg : Default;
}

export function OrDefault_NonEmptyString( Arg: string | null | undefined, Default: string): string{
	return ( Arg != null && Arg != undefined && Arg.length) ? Arg : Default;
}

export function MessageEmbed_NoThrow( embed: Discord.MessageEmbed, name: string, value: string, inline?: boolean | undefined ){
	return embed.addField( name, OrDefault_NonEmptyString(value, "<ERROR>"), inline)
}

export function OrFail<T>(Arg: T | null | undefined): T {
	if (Arg) return Arg;
	throw new Error('OrFail<T> resulted in fail!');
}

export interface textEllipsisOptions {
	side: 'end' | 'start' | undefined | void | null;
	ellipsis: string | '...';
}

export function textEllipsis(
	str: string,
	maxLength: number,
	opts: textEllipsisOptions = { side: 'end', ellipsis: '...' }
) {
	if (str.length > maxLength) {
		switch (opts.side) {
			case 'start':
				return (
					opts.ellipsis +
					str.slice(-(maxLength - opts.ellipsis.length))
				);
			case 'end':
			default:
				return (
					str.slice(0, maxLength - opts.ellipsis.length) +
					opts.ellipsis
				);
		}
	}
	return str;
}

export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
	return o[propertyName]; // o[propertyName] is of type T[K]
}

export function dynamicSort<T>(property: keyof T, sortOrder: number = 1) {
	return function (a: T, b: T): number {
		var result =
			getProperty(a, property) < getProperty(b, property)
				? -1
				: getProperty(a, property) > getProperty(b, property)
				? 1
				: 0;
		return result * sortOrder;
	};
}
