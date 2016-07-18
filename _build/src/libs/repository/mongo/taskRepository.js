"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mongoRepository_1 = require("./mongoRepository");
var TaskRepository = (function (_super) {
    __extends(TaskRepository, _super);
    function TaskRepository() {
        _super.call(this);
    }
    TaskRepository.prototype.getCollectionName = function () {
        return "tasks";
    };
    return TaskRepository;
}(mongoRepository_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TaskRepository;

//# sourceMappingURL=taskRepository.js.map
