/// <reference path="../typings.d.ts" />
import {IPlugin} from "./libs/plugins/interfaces";
import Configurations from "./configs/configurations";
import * as Hapi from "hapi";
import Routes from "./routes";

const server = new Hapi.Server();
server.connection({ port: Configurations.Server.port });

//  Setup Hapi Plugins
const fs = require('fs');
const path = require('path');
const pluginsPath = __dirname + '/libs/plugins/';
const plugins = fs.readdirSync(pluginsPath).filter(file => fs.statSync(path.join(pluginsPath, file)).isDirectory());

plugins.forEach((pluginName: string) => {
    let plugin: IPlugin = (require("./libs/plugins/" + pluginName)).default();
    if (Configurations.Server.env !== 'testing') {
      console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
    }
    plugin.register(server);
});

//Register Routes
Routes(server);

server.start(function() {
  if (Configurations.Server.env !== 'testing')
    console.log('Server running at:', server.info.uri);
});

export default server;
