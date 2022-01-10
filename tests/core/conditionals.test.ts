import { assert, expect } from 'chai'
import { executableArguments, executable } from '../../src/core/condition.class'
import { arrayConcat, arrayIncludes, arrayIncludesAny, arrayPop, arrayPush } from '../../src/core/conditionals/array'
import { RedditProvider } from '../../src/core/providers/reddit.provider'

let testArguments: executableArguments = {
    user: RedditProvider.Instance.getRedditClient().getUser("fsv"),
    target: RedditProvider.Instance.getRedditClient().getComment("hs1v0pa"),
    targetType: 'Comment',
    cookies: []
}

describe("executables", function () {
    it("should reject promise if executed without internal value", function (done) {
        (new executable()).execute(testArguments).then(done).catch((reason) => {
            expect(reason).to.equal("Undefined generic value in executable<Type>");
            done();
        })
    })

    it("should resolve promise with internal value", function (done) {
        (new executable("test")).execute(testArguments).then((value) => { expect(value).to.equal("test"); done(); }).catch(done)
    })
})

describe("conditionals", function () {

    describe("#array", function () {

        describe("#arrayIncludes<Type>", function() {
            it("should return true when array includes a value", function(done){
                (new arrayIncludes( new executable([1,2,3]), new executable(1)))
                .execute(testArguments).then( (value) => {
                    expect(value).to.be.true;
                    done()
                }).catch(done)
            })

            it("should return false when array does not includes a value", function(done){
                (new arrayIncludes(new executable([1,2,3]), new executable(4)))
                .execute(testArguments).then( (value) => {
                    expect(value).to.be.false;
                    done()
                }).catch(done)
            })
        })

        describe("#arrayIncludesAny<Type>", function() {
            it("should return true when array includes a value in array", function(done){
                (new arrayIncludesAny(new executable([1,2,3]),new executable([1])))
                .execute(testArguments).then( (value) => {
                    expect(value).to.be.true;
                    done()
                }).catch(done)
            })

            it("should return true when array includes multiple values in array", function(done){
                (new arrayIncludesAny(new executable([1,2,3]),new executable([1,2])))
                .execute(testArguments).then( (value) => {
                    expect(value).to.be.true;
                    done()
                }).catch(done)
            })

            it("should return true when array includes a value in array containing value not in array", function(done){
                (new arrayIncludesAny(new executable([1,2,3]), new executable([1,4])))
                .execute(testArguments).then( (value) => {
                    expect(value).to.be.true;
                    done()
                }).catch(done)
            })

            it("should return false when array does not includes a value", function(done){
                (new arrayIncludesAny(
                    new executable([1,2,3]),
                    new executable([4])
                )).execute(testArguments).then( (value) => {
                    expect(value).to.be.false;
                    done()
                }).catch(done)
            })
        })

        describe("#arrayPop<Type>", function() {
            it("should return last value of an array", function(done){
                (new arrayPop(new executable([1,2,3]))).execute(testArguments).then( value => {
                    expect(value).to.equal(3)
                    done()
                }).catch(done)
            })

            it("should reject on empty array", function(done){
                (new arrayPop(new executable([]))).execute(testArguments).then(done).catch((value) =>{
                    expect(value).to.equal("Empty array in arrayPop<Type>")
                    done()
                })
            })
        })

        describe("#arrayPush<type>", function(){
            it("should return array containing new value at end", function(done){
                (new arrayPush(new executable([1,2,3]), new executable(4))).execute(testArguments).then((value)=>{
                    expect(value).to.deep.equal([1,2,3,4]);
                    done()
                }).catch(done)
            })
        })

        describe("#arrayConcat<type>", function(){
            it("should return array containing new values at end", function(done){
                (new arrayConcat(new executable([1,2,3]), new executable([4,5,6]))).execute(testArguments).then((value)=>{
                    expect(value).to.deep.equal([1,2,3,4,5,6]);
                    done()
                }).catch(done)
            })
        })

    })

})