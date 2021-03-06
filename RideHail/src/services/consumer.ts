import Joi from '@hapi/joi';

import * as repo from '../repositories/consumer';
import { IConsumer } from '../interfaces/user';
import { validateRequest } from '../validations/user';
import { Consumers } from '../entities/consumers';
import Auth from '../utils/Auth';
import { IConsumerStateChange } from '../interfaces/stateChange';
import { CreateUserSchema } from '../schemas/UserSchema';
import { ConsumerStatusUpdateSchema } from '../schemas/ConsumerSchema';

export const getAll = async () => {
    return repo.getAll();
};

export const saveConsumer = async (consumerReq: IConsumer) => {

    const error = validateRequest(consumerReq, CreateUserSchema);
    if(error) {
        return error;
    }
    
    const consumer = new Consumers(consumerReq);
    const hash = await Auth.hashPassword(consumerReq.password);
    if (hash instanceof Error) {
        return hash;
    }
    else {
        consumer.passwordHash = hash;
        try {
            const saved = await repo.save(consumer)
            return saved;
        } catch (error) {
            return error;
        }
    }


    //TODO: work on validations and seeding
    //https://github.com/mattwelke/example-typeorm-postgres
   //https://dev.to/jacqueline/using-hapi-joi-version-16-1-7-to-validate-a-request-body-in-a-restful-api-bje
};

export const changeConsumerState = async (req: IConsumerStateChange) => {
    const error = validateRequest(req, ConsumerStatusUpdateSchema);
    if(error) {
        return error;
    }
    return repo.changeConsumerState(req);
};

export const getConsumerProfile = async (id: number) => {
    return repo.getUserByID(id);
};