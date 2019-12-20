import Joi from '@hapi/joi';

import * as repo from '../repositories/driver';
import { IDriver } from '../interfaces/user';
import { validateSignUp } from '../validations/user';
import { Drivers } from '../entities/drivers';
import Auth from '../utils/Auth';

export const getAll = async () => {
    return repo.getAll();
};

export const saveDriver = async (driverReq: IDriver) => {

    const error = validateSignUp(driverReq);
    if(error) {
        return error;
    }
    else {
        const driver = new Drivers(driverReq);
        const hash = await Auth.hashPassword(driverReq.password);
        if(hash instanceof Error) {
            return hash;
        }
        else {
            driver.passwordHash = hash;
            try {
                const saved = await repo.save(driver)
                return saved;
            } catch (error) {
                return error;
            }
        }
    }

    //TODO: work on validations and seeding
    //https://github.com/mattwelke/example-typeorm-postgres
   //https://dev.to/jacqueline/using-hapi-joi-version-16-1-7-to-validate-a-request-body-in-a-restful-api-bje
};