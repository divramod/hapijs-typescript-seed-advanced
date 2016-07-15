import * as Joi from "joi";

export const createUserModel = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required()
});

export const updateUserModel = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  completed: Joi.boolean()
});

export const userModel = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  completed: Joi.boolean(),
  createdDate: Joi.date(),
  updatedAt: Joi.date()
}).label("User Model").description("Json body that represents a user");
