import { executable, executableArguments } from '../condition.class';
import watchedManager from '../managers/watched.manager';

export class isWatched extends executable<boolean> {
	public override execute(args: executableArguments): Promise<boolean> {
		return watchedManager.Instance.isUserWatched(
			args.user.name.toLowerCase()
		);
	}
}
