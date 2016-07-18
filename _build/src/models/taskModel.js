"use strict";
var Joi = require("joi");
exports.createTaskModel = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
});
exports.updateTaskModel = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    completed: Joi.boolean()
});
exports.taskModel = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    completed: Joi.boolean(),
    createdDate: Joi.date(),
    updatedAt: Joi.date()
}).label("Task Model").description("Json body that represents a task.");

//# sourceMappingURL=taskModel.js.map
