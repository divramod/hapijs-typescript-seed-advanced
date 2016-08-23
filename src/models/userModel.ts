import * as Joi from "joi";

export const activateUserModel = Joi.object().keys({
  _id: Joi.string().required(),
  token: Joi.string().required(),
});

export const createUserModel = Joi.object().keys({
  username: Joi.string().required(),
  name: Joi.string().required(),
  forename: Joi.string().required(),
  email: Joi.string().email().required(),
  telefon: Joi.number().required(),
});

export const updateUserModel = Joi.object().keys({
  username: Joi.string().required(),
  name: Joi.string().required(),
  forename: Joi.string().required(),
  email: Joi.string().email().required(),
  telefon: Joi.number().required(),
});

export const userModel = Joi.object({
  _id: Joi.string().required(),
  username: Joi.string().required(),
  name: Joi.string().required(),
  forename: Joi.string().required(),
  email: Joi.string().email(),
  telefon: Joi.number().required(),
  createdDate: Joi.date(),
  updatedAt: Joi.date()
}).label("User Model").description("Json body that represents a user");
