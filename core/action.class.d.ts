import { executableArguments } from './condition.class';
export default abstract class action {
    constructor();
    execute(args: executableArguments): Promise<void>;
}
