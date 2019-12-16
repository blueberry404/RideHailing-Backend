import Joi from '@hapi/joi';

import * as repo from '../repositories/consumer';
import { IConsumer } from '../interfaces/user';
import { CreateUserSchema } from '../schemas/UserSchema';

export const getAll = async () => {
    return repo.getAll();
};

export const saveConsumer = async (consumer: IConsumer) => {
    //TODO: work on validations and seeding
    //https://github.com/mattwelke/example-typeorm-postgres
   //https://dev.to/jacqueline/using-hapi-joi-version-16-1-7-to-validate-a-request-body-in-a-restful-api-bje
};