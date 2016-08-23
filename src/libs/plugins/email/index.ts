/// <reference path="../../../../typings.d.ts" />
import {IPlugin} from '../interfaces'
import * as Hapi from 'hapi'

const nodemailer = require('nodemailer');
const env = process.env.env || 'production';
const pw = process.env.pw || false;
const transporter = nodemailer.createTransport('smtps://newcomer.shareyourtime%40gmail.com:' + pw + '@smtp.gmail.com');

const emailPlugin = {
    register: function (server, options, next) {
        let emailFunctions = {
            sendEmail: function(mailOptions) {
              if (pw !== false) {
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
                return true;
              } else {
                return true;
              }
          }
        }
        server.expose(emailFunctions);
        next();
    }
};

emailPlugin.register.attributes = {
    name: 'Email Plugin',
    version: '0.0.1'
};

let events = {};
events = { error: '*' };
if (env !== 'testing')
events = { error: '*', log: '*', response: '*', request: '*' };

const opts = {
opsInterval: 1000,
reporters: [{
    reporter: require('good-console'),
    events: events
}]
};

export default (): IPlugin => {

    return {
        register: (server: Hapi.Server) => {

            server.register({
                register: emailPlugin,
                options: opts
            }, (error) => {
                if (error) {
                    console.log('error', error);
                }
            });
        },
        info: () => {
            return emailPlugin.register.attributes;
        }
    }
};
