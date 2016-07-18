"use strict";
var BaseController = (function () {
    function BaseController(server) {
        this.server = server;
    }
    BaseController.prototype.logInfo = function (message) {
        this.server.log('info', message);
    };
    BaseController.prototype.logError = function (message) {
        this.server.log('error', message);
    };
    return BaseController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseController;

//# sourceMappingURL=baseController.js.map
