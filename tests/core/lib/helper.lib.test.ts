import { expect } from 'chai';
import {
	getProperty,
	OrDefault,
	OrFail,
	textEllipsis,
} from '../../../src/core/lib/helper.lib';

describe('helper.lib.ts', function () {
	describe('#OrDefault<T>', function () {
		it('should return the argument if defined and not null', function (done) {
			expect(OrDefault('Test', 'DefaultValue')).to.equal('Test');
			done();
		});

		it('should return the default value if arg is null', function (done) {
			expect(OrDefault(null, 'DefaultValue')).to.equal('DefaultValue');
			done();
		});

		it('should return the default value if arg is undefined', function (done) {
			expect(OrDefault(undefined, 'DefaultValue')).to.equal(
				'DefaultValue'
			);
			done();
		});
	});

	describe('#OrFail<T>', function () {
		it('should return argument if defined and not null', function (done) {
			expect(OrFail('Test')).to.equal('Test');
			done();
		});

		it('should throw if argument is null', function (done) {
			expect(OrFail.bind(null)).to.throw();
			done();
		});

		it('should throw if argument is undefined', function (done) {
			expect(OrFail.bind(undefined)).to.throw();
			done();
		});
	});

	describe('#textEllipsis', function () {
		it('should not truncate strings shorter than maxLength', function (done) {
			expect(textEllipsis('test', 100)).to.equal('test');
			done();
		});

		it('should truncate long strings maxLength including ellipsis', function (done) {
			expect(textEllipsis('Long test string', 5).length).to.equal(5);
			done();
		});

		it("should return string ending with ellipsis if side = 'end'", function (done) {
			expect(
				textEllipsis('Long test string', 5, {
					side: 'end',
					ellipsis: '...',
				}).endsWith('...')
			).to.be.true;
			done();
		});

		it("should return string starting with ellipsis if side = 'start'", function (done) {
			expect(
				textEllipsis('Long test string', 5, {
					side: 'start',
					ellipsis: '...',
				}).startsWith('...')
			).to.be.true;
			done();
		});
	});

	describe('#getProperty<T, K extends keyof T>', function () {
		it('should return the value of the named property', function (done) {
			expect(getProperty({ hello: true }, 'hello')).to.be.true;
			done();
		});
	});

	describe('#dynamicSort<T>', function () {
		it('should return array sorted by chosen property');
	});
});
