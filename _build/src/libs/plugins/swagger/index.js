"use strict";
var Inert = require('inert');
var Vision = require('vision');
var HapiSwagger = require('hapi-swagger');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function () {
    return {
        register: function (server) {
            server.register([
                Inert,
                Vision,
                {
                    register: HapiSwagger,
                    options: {
                        info: {
                            title: 'Task Api',
                            description: 'Simple Task Api.',
                            version: '1.0'
                        },
                        tags: [
                            {
                                'name': 'tasks',
                                'description': 'Api tasks interface.'
                            }
                        ],
                        enableDocumentation: true,
                        documentationPath: '/documentation'
                    }
                }
            ], function (error) {
                if (error) {
                    console.log('error', error);
                }
            });
        },
        info: function () {
            return {
                name: "Swagger Documentation",
                version: "1.0.0"
            };
        }
    };
};

//# sourceMappingURL=index.js.map
