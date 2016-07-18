"use strict";
var Joi = require("joi");
exports.createUserModel = Joi.object().keys({
    username: Joi.string().required(),
    name: Joi.string().required(),
    forename: Joi.string().required(),
    email: Joi.string().email()
});
exports.updateUserModel = Joi.object().keys({
    username: Joi.string().required(),
    name: Joi.string().required(),
    forename: Joi.string().required(),
    email: Joi.string().email()
});
exports.userModel = Joi.object({
    _id: Joi.string().required(),
    username: Joi.string().required(),
    name: Joi.string().required(),
    forename: Joi.string().required(),
    email: Joi.string().email(),
    createdDate: Joi.date(),
    updatedAt: Joi.date()
}).label("User Model").description("Json body that represents a user");

//# sourceMappingURL=userModel.js.map
