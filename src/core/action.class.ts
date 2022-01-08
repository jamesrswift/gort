import Snoowrap from 'snoowrap'
import { executableArguments } from './condition.class';

export default abstract class action {

    public constructor() { }

    public abstract execute(args: executableArguments): void

}