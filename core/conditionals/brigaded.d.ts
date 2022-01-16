import { executable, executableArguments } from '../condition.class';
export declare class brigadeOrigin extends executable<string> {
    execute(args: executableArguments): Promise<string>;
}
