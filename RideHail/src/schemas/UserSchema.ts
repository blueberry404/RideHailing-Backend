import Joi from '@hapi/joi';

export const CreateUserSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    mobile: Joi.string().required().min(10),
});

export const LoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    type: Joi.string().required().valid('Driver', 'Consumer')
});