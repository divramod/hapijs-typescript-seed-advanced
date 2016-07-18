"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mongoRepository_1 = require("./mongoRepository");
var UserRepository = (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        _super.call(this);
    }
    UserRepository.prototype.getCollectionName = function () {
        return "users";
    };
    return UserRepository;
}(mongoRepository_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserRepository;

//# sourceMappingURL=userRepository.js.map
