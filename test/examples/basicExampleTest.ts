/// <reference path="../../typings/index.d.ts" />
const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();

lab.experiment('examples/basicTest.ts', () => {

    lab.it('returns true when 1 + 1 equals 2', (done) => {
        Code.expect(1 + 2).to.equal(3);
        done();
    });

    lab.it('returns true when 1 + 1 equals 2', (done) => {
        Code.expect(1 + 1).to.equal(2);
        done();
    });
});

