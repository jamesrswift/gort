import commandBase from '../core/command.class';
declare class helpCommand extends commandBase {
    name: string;
    description: string;
    usage: string;
    execute(): Promise<string | undefined | null>;
}
declare const _default: {
    commands: helpCommand[];
};
export default _default;
