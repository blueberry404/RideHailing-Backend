import Joi from '@hapi/joi';

export const DriverStatusUpdateSchema = Joi.object().keys({
    id: Joi.number().required(),
    state: Joi.string().required().valid('NOT_AVAILABLE', 'IDLE', 'BUSY')
});

export const DriverLocationUpdateSchema = Joi.object().keys({
    id: Joi.number().required(),
    location: Joi.object().required()
});