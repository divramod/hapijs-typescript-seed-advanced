import * as Joi from "joi";

export const createDoorModel = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    opened: Joi.boolean().required()
});

export const updateDoorModel = Joi.object().keys({
    opened: Joi.boolean().required()
});


export const doorModel = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    createdDate: Joi.date(),
    updatedAt: Joi.date(),
    opened: Joi.boolean()
}).label("Door Model").description("Json body that represents a door.");
