import Joi from '@hapi/joi';

export const RideRequestSchema = Joi.object().keys({
    userId: Joi.number().required(),
    sourceLat: Joi.number().required(),
    sourceLong: Joi.number().required(),
    destLat: Joi.number().required(),
    destLong: Joi.number().required(),
});

export const RideAcceptSchema = Joi.object().keys({
    rideId: Joi.number().required(),
    consumerId: Joi.number().required(),
    driverId: Joi.number().required(),
});