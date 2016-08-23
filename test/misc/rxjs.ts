/// <reference path="../../typings/index.d.ts" />
import * as chai from "chai";
let assert = chai.assert;
var Rx = require('rxjs');

describe("MISC rxjs", function() {
    it("fromCallback", function(done) {
        assert.strictEqual(true, true, 'email send');
        done();
    });

    it('should emit one value from a callback', function () {
        function callback(datum, cb) {
            cb(null, datum);
        }
        var boundCallback = Rx.Observable.bindNodeCallback(callback);
        var results = [];
        boundCallback(42)
          .subscribe(
            function (x) {
              results.push(x);
            },
            null,
            function () {
              results.push('done');
            }
          );
        chai.expect(results).to.deep.equal([42, 'done']);
    });
});

