import * as Joi from "joi";

export const createUserModel = Joi.object().keys({
  username: Joi.string().required(),
  name: Joi.string().required(),
  forename: Joi.string().required(),
  email: Joi.string().email()
});

export const updateUserModel = Joi.object().keys({
  username: Joi.string().required(),
  name: Joi.string().required(),
  forename: Joi.string().required(),
  email: Joi.string().email()
});

export const userModel = Joi.object({
  _id: Joi.string().required(),
  username: Joi.string().required(),
  name: Joi.string().required(),
  forename: Joi.string().required(),
  email: Joi.string().email(),
  createdDate: Joi.date(),
  updatedAt: Joi.date()
}).label("User Model").description("Json body that represents a user");
