import Snoowrap from 'snoowrap';
import { executableArguments } from './condition.class';

export default abstract class action {
	public constructor() {}
	public async execute(args: executableArguments): Promise<void> {}
}
