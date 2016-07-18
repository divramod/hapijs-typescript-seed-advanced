"use strict";
var configurations_1 = require("./configs/configurations");
var Hapi = require("hapi");
var routes_1 = require("./routes");
var fs = require('fs');
var path = require('path');
var port = process.env.port || configurations_1.default.Server.port;
var server = new Hapi.Server();
server.connection({ port: port });
//  Setup Hapi Plugins
var pluginsPath = __dirname + '/libs/plugins/';
var plugins = fs.readdirSync(pluginsPath).filter(function (file) { return fs.statSync(path.join(pluginsPath, file)).isDirectory(); });
plugins.forEach(function (pluginName) {
    var plugin = (require("./libs/plugins/" + pluginName)).default();
    console.log("Register Plugin " + plugin.info().name + " v" + plugin.info().version);
    plugin.register(server);
});
//Register Routes
routes_1.default(server);
server.start(function () {
    console.log('Server running at:', server.info.uri);
});

//# sourceMappingURL=server.js.map
