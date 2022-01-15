import { Comment, Submission } from 'snoowrap';
import { executable, executableArguments } from '../condition.class';
import brigadeManager from '../managers/brigade.manager';

export class brigadeOrigin extends executable<string> {
	public override async execute(args: executableArguments): Promise<string> {
		// Get threadID
		if (args.targetType == 'Submission') return ''; // New threads can't be brigaded
		const threadID: string = (<Comment>args.target).parent_id; // I hope parent_id is the id of the thread

		// Check if thread is on brigaded list
		if (await brigadeManager.Instance.isTargetOnBrigadeList(threadID)) {
			const info = await brigadeManager.Instance.getBrigadeEntryInfo(
				threadID
			);
			return info.origin;
		}
		return '';
	}
}
