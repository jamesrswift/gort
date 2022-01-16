import { executable, executableArguments } from '../condition.class';
export declare class isWatched extends executable<boolean> {
    execute(args: executableArguments): Promise<boolean>;
}
