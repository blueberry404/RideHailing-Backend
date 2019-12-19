import Joi from '@hapi/joi';

export const CreateUserSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    mobile: Joi.string().required().min(10),
});