'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const chai_1 = require('chai');
const condition_class_1 = require('../../src/core/condition.class');
const array_1 = require('../../src/core/conditionals/array');
const reddit_provider_1 = require('../../src/core/providers/reddit.provider');
let testArguments = {
	user: reddit_provider_1.RedditProvider.Instance.getRedditClient().getUser(
		'fsv'
	),
	target: reddit_provider_1.RedditProvider.Instance.getRedditClient().getComment(
		'hs1v0pa'
	),
	targetType: 'Comment',
	cookies: [],
};
describe('executables', function () {
	it('should reject promise if executed without internal value', function (done) {
		new condition_class_1.executable()
			.execute(testArguments)
			.then(done)
			.catch((reason) => {
				(0, chai_1.expect)(reason).to.equal(
					'Undefined generic value in executable<Type>'
				);
				done();
			});
	});
	it('should resolve promise with internal value', function (done) {
		new condition_class_1.executable('test')
			.execute(testArguments)
			.then((value) => {
				(0, chai_1.expect)(value).to.equal('test');
				done();
			})
			.catch(done);
	});
});
describe('conditionals', function () {
	describe('#array', function () {
		describe('#arrayIncludes<Type>', function () {
			it('should return true when array includes a value', function (done) {
				new array_1.arrayIncludes(
					new condition_class_1.executable([1, 2, 3]),
					new condition_class_1.executable(1)
				)
					.execute(testArguments)
					.then((value) => {
						(0, chai_1.expect)(value).to.be.true;
						done();
					})
					.catch(done);
			});
			it('should return false when array does not includes a value', function (done) {
				new array_1.arrayIncludes(
					new condition_class_1.executable([1, 2, 3]),
					new condition_class_1.executable(4)
				)
					.execute(testArguments)
					.then((value) => {
						(0, chai_1.expect)(value).to.be.false;
						done();
					})
					.catch(done);
			});
		});
		describe('#arrayIncludesAny<Type>', function () {
			it('should return true when array includes a value in array', function (done) {
				new array_1.arrayIncludesAny(
					new condition_class_1.executable([1, 2, 3]),
					new condition_class_1.executable([1])
				)
					.execute(testArguments)
					.then((value) => {
						(0, chai_1.expect)(value).to.be.true;
						done();
					})
					.catch(done);
			});
			it('should return true when array includes multiple values in array', function (done) {
				new array_1.arrayIncludesAny(
					new condition_class_1.executable([1, 2, 3]),
					new condition_class_1.executable([1, 2])
				)
					.execute(testArguments)
					.then((value) => {
						(0, chai_1.expect)(value).to.be.true;
						done();
					})
					.catch(done);
			});
			it('should return true when array includes a value in array containing value not in array', function (done) {
				new array_1.arrayIncludesAny(
					new condition_class_1.executable([1, 2, 3]),
					new condition_class_1.executable([1, 4])
				)
					.execute(testArguments)
					.then((value) => {
						(0, chai_1.expect)(value).to.be.true;
						done();
					})
					.catch(done);
			});
			it('should return false when array does not includes a value', function (done) {
				new array_1.arrayIncludesAny(
					new condition_class_1.executable([1, 2, 3]),
					new condition_class_1.executable([4])
				)
					.execute(testArguments)
					.then((value) => {
						(0, chai_1.expect)(value).to.be.false;
						done();
					})
					.catch(done);
			});
		});
		describe('#arrayPop<Type>', function () {
			it('should return last value of an array', function (done) {
				new array_1.arrayPop(
					new condition_class_1.executable([1, 2, 3])
				)
					.execute(testArguments)
					.then((value) => {
						(0, chai_1.expect)(value).to.equal(3);
						done();
					})
					.catch(done);
			});
			it('should reject on empty array', function (done) {
				new array_1.arrayPop(new condition_class_1.executable([]))
					.execute(testArguments)
					.then(done)
					.catch((value) => {
						(0, chai_1.expect)(value).to.equal(
							'Empty array in arrayPop<Type>'
						);
						done();
					});
			});
		});
		describe('#arrayPush<type>', function () {
			it('should return array containing new value at end', function (done) {
				new array_1.arrayPush(
					new condition_class_1.executable([1, 2, 3]),
					new condition_class_1.executable(4)
				)
					.execute(testArguments)
					.then((value) => {
						(0, chai_1.expect)(value).to.deep.equal([1, 2, 3, 4]);
						done();
					})
					.catch(done);
			});
		});
		describe('#arrayConcat<type>', function () {
			it('should return array containing new values at end', function (done) {
				new array_1.arrayConcat(
					new condition_class_1.executable([1, 2, 3]),
					new condition_class_1.executable([4, 5, 6])
				)
					.execute(testArguments)
					.then((value) => {
						(0, chai_1.expect)(value).to.deep.equal([
							1, 2, 3, 4, 5, 6,
						]);
						done();
					})
					.catch(done);
			});
		});
	});
});
