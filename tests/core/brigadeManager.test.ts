import { expect } from 'chai';
import brigadeManager from '../../src/core/managers/brigade.manager';

describe('brigadeManager', () => {
	describe('#stringContainsBrigadeLink', () => {
		const listOfTestStrings: string[] = [
			'https://www.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/',
			'https://www.reddit.com/r/CoronavirusUK/comments/s4pk8w/',
			'https://www.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/hssml66/',
			'http://www.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/',
			'http://www.reddit.com/r/CoronavirusUK/comments/s4pk8w/',
			'http://www.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/hssml66/',

			'https://old.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/',
			'https://old.reddit.com/r/CoronavirusUK/comments/s4pk8w/',
			'https://old.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/hssml66/',
			'http://old.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/',
			'http://old.reddit.com/r/CoronavirusUK/comments/s4pk8w/',
			'http://old.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/hssml66/',

			'https://np.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/',
			'https://np.reddit.com/r/CoronavirusUK/comments/s4pk8w/',
			'https://np.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/hssml66/',
			'http://np.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/',
			'http://np.reddit.com/r/CoronavirusUK/comments/s4pk8w/',
			'http://np.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/hssml66/',

			'www.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/',
			'old.reddit.com/r/CoronavirusUK/comments/s4pk8w/',
			'np.reddit.com/r/CoronavirusUK/comments/s4pk8w/unsolicited_dms_sent_to_rcoronavirusuk_users/hssml66/',
		];

		listOfTestStrings.forEach((entry) => {
			const info = brigadeManager.stringContainsBrigadeLink(entry)[0];

			describe(entry, () => {
				it('should find a match and reflect this in bContainsLink', (done) => {
					expect(info.bContainsLink).to.be.true;
					done();
				});

				it('should store input string', (done) => {
					expect(info.sInput).to.equal(entry);
					done();
				});

				it('should find targetID', (done) => {
					expect(info.sTargetID).to.equal('s4pk8w');
					done();
				});
			});
		});
	});
});
