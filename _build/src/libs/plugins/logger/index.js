"use strict";
var Good = require('good');
var GoodConsole = require('good-console');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function () {
    return {
        register: function (server) {
            var opts = {
                opsInterval: 1000,
                reporters: [{
                        reporter: require('good-console'),
                        events: { error: '*', log: '*', response: '*', request: '*' }
                    }]
            };
            server.register({
                register: Good,
                options: opts
            }, function (error) {
                if (error) {
                    console.log('error', error);
                }
            });
        },
        info: function () {
            return {
                name: "Good Logger",
                version: "1.0.0"
            };
        }
    };
};

//# sourceMappingURL=index.js.map
