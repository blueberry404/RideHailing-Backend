import * as repo from '../repositories/driver';
import { IDriver } from '../interfaces/user';
import { IDriverLocationUpdate } from '../interfaces/driverRequest';
import { validateRequest } from '../validations/user';
import { Drivers } from '../entities/drivers';
import Auth from '../utils/Auth';
import { IDriverStateChange } from '../interfaces/stateChange';
import { CreateUserSchema } from '../schemas/UserSchema';
import { DriverStatusUpdateSchema, DriverLocationUpdateSchema } from '../schemas/DriverSchema';

export const getAll = async () => {
    return repo.getAll();
};

export const saveDriver = async (driverReq: IDriver) => {

    const error = validateRequest(driverReq, CreateUserSchema);
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
};

export const changeDriverStatus = async (req: IDriverStateChange) => {
    const error = validateRequest(req, DriverStatusUpdateSchema);
    if(error) {
        return error;
    }
    else {
        try {
            const saved = await repo.changeDriverState(req);
            return saved;
        } catch (error) {
            return error;
        }
    }
};

export const updateDriverLocation = async (req: IDriverLocationUpdate) => {
    const error = validateRequest(req, DriverLocationUpdateSchema);
    if(error) {
        return error;
    }
    // else if(!req.hasOwnProperty('location')) { //just for manual temporary check
    //     return "Parameter location is missing";
    // }
    // else if(!req.location.hasOwnProperty('latitude') || req.location.hasOwnProperty('longitude')) {
    //     return "Parameter latitude/longitude missing";
    // }
    else {
        try {
            const saved = await repo.updateDriverLocation(req);
            return saved;
        } catch (error) {
            return error;
        }
    }
};

export const getDriverProfile = async (id: number) => {
    return repo.getUserByID(id);
};