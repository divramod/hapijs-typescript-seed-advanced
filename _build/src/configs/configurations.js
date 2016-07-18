"use strict";
var Configurations = (function () {
    function Configurations() {
    }
    Object.defineProperty(Configurations, "Repository", {
        get: function () {
            return {
                connectionString: "mongodb://localhost/locationdb"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configurations, "Server", {
        get: function () {
            return {
                port: 8100
            };
        },
        enumerable: true,
        configurable: true
    });
    return Configurations;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Configurations;

//# sourceMappingURL=configurations.js.map
