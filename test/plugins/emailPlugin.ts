/// <reference path="../../typings/index.d.ts" />
import * as chai from "chai";
let assert = chai.assert;
const Rx = require('rxjs');
const nodemailer = require('nodemailer');

import server from "../../src/server";

describe("PLUGIN emailPlugin", function() {
  
  // ========================== [ test sending an email ] ==========================
  it.skip("should send an email", function(done) {
      let mailOptions = {
          from: '"Fred Foo 👥" <newcomer.shareyourtime@gmail.com>', // sender address
          to: 'divramod@gmail.com', // list of receivers; comma seperated
          subject: 'Hello ✔', // Subject line
          text: 'Hello world 🐴', // plaintext body
          html: '<b>Hello world 🐴</b>' // html body
      };
      let ep = server.plugins.emailPlugin;
      let sendEmailObservable = ep.sendEmail(mailOptions);
      assert.strictEqual(true, false, 'email send');
      done();
  });

  // ========================== [ test nodemailer sendEmail as RxJS Observable ] ==========================
  it.skip('should emit one value from a callback', function () {

      let mailOptions = {
          from: '"Fred Foo 👥" <newcomer.shareyourtime@gmail.com>', // sender address
          to: 'divramod@gmail.com', // list of receivers; comma seperated
          subject: 'Hello ✔', // Subject line
          text: 'Hello world 🐴', // plaintext body
          html: '<b>Hello world 🐴</b>' // html body
      };
      let transporter = nodemailer.createTransport('smtps://newcomer.shareyourtime%40gmail.com:pw123456@smtp.gmail.com');

      let boundCallback = Rx.Observable.bindNodeCallback(transporter.sendMail);
      boundCallback(mailOptions, function(error, info){
        if(error){
          return error;
        }
        return info.response;
      }).subscribe(x => console.log(x), e => console.error(e));
      //chai.expect(results).to.deep.equal([42, 'done']);
  });

});
