import Joi from "@hapi/joi";

export const ConsumerStatusUpdateSchema = Joi.object().keys({
    id: Joi.number().required(),
    state: Joi.string().required().valid('IDLE', 'FINDING_RIDE', 'WAIT_FOR_RIDE', 'IN_RIDE')
});