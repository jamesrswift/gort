import { expect } from 'chai';
import {
	executable,
	executableArguments,
} from '../../src/core/condition.class';
import {
	arrayConcat,
	arrayIncludes,
	arrayIncludesAny,
	arrayIndexOf,
	arrayPop,
	arrayPush,
} from '../../src/core/conditionals/array';
import { and, not, notArray, or } from '../../src/core/conditionals/logic';
import { RedditProvider } from '../../src/core/providers/reddit.provider';

let testArguments: executableArguments = {
	user: RedditProvider.Instance.getRedditClient().getUser('fsv'),
	target: RedditProvider.Instance.getRedditClient().getComment('hs1v0pa'),
	targetType: 'Comment',
	cookies: [],
};

describe('executables', function () {
	it('should reject promise if executed without internal value', function (done) {
		new executable()
			.execute(testArguments)
			.then(done)
			.catch((reason) => {
				expect(reason).to.equal(
					'Undefined generic value in executable<Type>'
				);
				done();
			});
	});

	it('should resolve promise with internal value', function (done) {
		new executable('test')
			.execute(testArguments)
			.then((value) => {
				expect(value).to.equal('test');
				done();
			})
			.catch(done);
	});
});

describe('conditionals', function () {
	describe('#array', function () {
		describe('#arrayIncludes<Type>', function () {
			it('should return true when array includes a value', function (done) {
				new arrayIncludes(new executable([1, 2, 3]), new executable(1))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.true;
						done();
					})
					.catch(done);
			});

			it('should return false when array does not includes a value', function (done) {
				new arrayIncludes(new executable([1, 2, 3]), new executable(4))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.false;
						done();
					})
					.catch(done);
			});
		});

		describe('#arrayIncludesAny<Type>', function () {
			it('should return true when array includes a value in array', function (done) {
				new arrayIncludesAny(
					new executable([1, 2, 3]),
					new executable([1])
				)
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.true;
						done();
					})
					.catch(done);
			});

			it('should return true when array includes multiple values in array', function (done) {
				new arrayIncludesAny(
					new executable([1, 2, 3]),
					new executable([1, 2])
				)
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.true;
						done();
					})
					.catch(done);
			});

			it('should return true when array includes a value in array containing value not in array', function (done) {
				new arrayIncludesAny(
					new executable([1, 2, 3]),
					new executable([1, 4])
				)
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.true;
						done();
					})
					.catch(done);
			});

			it('should return false when array does not includes a value', function (done) {
				new arrayIncludesAny(
					new executable([1, 2, 3]),
					new executable([4])
				)
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.false;
						done();
					})
					.catch(done);
			});
		});

		describe('#arrayPop<Type>', function () {
			it('should return last value of an array', function (done) {
				new arrayPop(new executable([1, 2, 3]))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.equal(3);
						done();
					})
					.catch(done);
			});

			it('should reject on empty array', function (done) {
				new arrayPop(new executable([]))
					.execute(testArguments)
					.then(done)
					.catch((value) => {
						expect(value).to.equal('Empty array in arrayPop<Type>');
						done();
					});
			});
		});

		describe('#arrayPush<Type>', function () {
			it('should return array containing new value at end', function (done) {
				new arrayPush(new executable([1, 2, 3]), new executable(4))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.deep.equal([1, 2, 3, 4]);
						done();
					})
					.catch(done);
			});
		});

		// export class arraySort<Type> extends executable<Type[]>{

		describe('#arrayConcat<Type>', function () {
			it('should return array containing new values at end', function (done) {
				new arrayConcat(
					new executable([1, 2, 3]),
					new executable([4, 5, 6])
				)
					.execute(testArguments)
					.then((value) => {
						expect(value).to.deep.equal([1, 2, 3, 4, 5, 6]);
						done();
					})
					.catch(done);
			});
		});

		describe('#arrayIndexOf<Type>', function () {
			it('should return index of value in array', function (done) {
				new arrayIndexOf(new executable([1, 2, 3]), new executable(2))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.equal(1);
						done();
					})
					.catch(done);
			});

			it('should return -1 if value not in array', function (done) {
				new arrayIndexOf(new executable([1, 2, 3]), new executable(4))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.equal(-1);
						done();
					})
					.catch(done);
			});
		});

		// export class arrayCopyWithin<Type> extends executable<Type[]>{

		// export class arrayFill<Type> extends executable<Type[]>{

		// export class arrayShift<Type> extends executable<Type>{

		// export class arraySort<Type> extends executable<Type[]>{

		// export class arrayUnshift<Type> extends executable<Type[]>{

		// export class arrayJoin<Type> extends executable<string>{

		// export class arrayLastIndexOf<Type> extends executable<number>{

		// export class arraySlice<Type> extends executable<Type[]>{

		// export class arrayToString<Type> extends executable<string>{

		// export class arrayToLocalString<Type> extends executable<string>{
	});

	describe('#logic', function () {
		describe('#and', function () {
			it('should return true when all values are true, values as list', function (done) {
				new and(
					new executable(true),
					new executable(true),
					new executable(true)
				)
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.true;
						done();
					})
					.catch(done);
			});

			it('should return true when all values are true, values as array', function (done) {
				new and(new executable([true, true, true]))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.true;
						done();
					})
					.catch(done);
			});

			it('should return false when any value is false, values as list', function (done) {
				new and(
					new executable(true),
					new executable(false),
					new executable(true)
				)
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.false;
						done();
					})
					.catch(done);
			});

			it('should return false when any value is false, values as array', function (done) {
				new and(new executable([true, false, true]))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.false;
						done();
					})
					.catch(done);
			});
		});

		describe('#or', function () {
			it('should return true when all values are true, values as list', function (done) {
				new or(
					new executable(true),
					new executable(true),
					new executable(true)
				)
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.true;
						done();
					})
					.catch(done);
			});

			it('should return true when all values are true, values as array', function (done) {
				new or(new executable([true, true, true]))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.true;
						done();
					})
					.catch(done);
			});

			it('should return true when any value is true, values as list', function (done) {
				new or(
					new executable(true),
					new executable(false),
					new executable(true)
				)
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.true;
						done();
					})
					.catch(done);
			});

			it('should return true when any value is true, values as array', function (done) {
				new or(new executable([true, false, true]))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.true;
						done();
					})
					.catch(done);
			});

			it('should return false when no values are true, values as list', function (done) {
				new or(
					new executable(false),
					new executable(false),
					new executable(false)
				)
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.false;
						done();
					})
					.catch(done);
			});

			it('should return false when no values are true, values as array', function (done) {
				new or(new executable([false, false, false]))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.false;
						done();
					})
					.catch(done);
			});
		});

		describe('#not', function () {
			it('should return false when value is true', function (done) {
				new not(new executable(true))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.false;
						done();
					})
					.catch(done);
			});

			it('should return true when value is false', function (done) {
				new not(new executable(false))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.true;
						done();
					})
					.catch(done);
			});
		});

		describe('#notArray', function () {
			it('should return the opposite of given values, values as list', function (done) {
				new notArray(
					new executable(true),
					new executable(false),
					new executable(true)
				)
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.deep.equal([false, true, false]);
						done();
					})
					.catch(done);
			});

			it('should return the opposite of given values, values as array', function (done) {
				new notArray(new executable([true, false, true]))
					.execute(testArguments)
					.then((value) => {
						expect(value).to.be.deep.equal([false, true, false]);
						done();
					})
					.catch(done);
			});
		});
	});
});
