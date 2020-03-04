import { getRepository } from 'typeorm';
import { Drivers } from '../entities/drivers';
import { IDriverLocationUpdate } from '../interfaces/driverRequest';
import { Ride } from '../entities/ride';
import { DriverState } from '../enums/DriverState';
import { IDriverStateChange } from '../interfaces/stateChange';
import { ILoginRequest } from '../interfaces/loginRequest';

export const getAll = async () => {
    return getRepository(Drivers).find();
};

export const save = async (driver: Drivers) => {
    return getRepository(Drivers).save(driver);
};

export const updateDriverLocation = async (driverReq: IDriverLocationUpdate) => {
    try {
        
        const drivers = await getRepository(Drivers).find({
            where: {
                id: driverReq.id
            },
            take: 1,
        });
    
        if(drivers.length > 0) {
            const driver = drivers[0];
            const { latitude, longitude } = driverReq.location;
            driver.location = { latitude, longitude };
            try {
                const saved = await save(driver);
                return saved;
            } catch (error) {
                return error;
            }
        }
        else {
            return 'User not found';
        }

    } catch (error) {
        return error;
    }
};

export const findNearestDriver = async (ride: Ride) => {
    //for now, just pick drivers with idle state
    try {
        const drivers = await getRepository(Drivers).find({
            where: {
                state: DriverState.IDLE
            },
        });
        return drivers;
    }
    catch(error) {
        return error;
    }
};

export const changeDriverState = async (req: IDriverStateChange) => {
    try {
        const user = await getRepository(Drivers).findOne(req.id);
        if(user) {
            user.state = req.state;
            return save(user);
        }
        return user;
    }
    catch(error) {
        return error;
    }
};

export const getUser = async (req: ILoginRequest) => {
    try {
        return getRepository(Drivers).findOne(undefined, {
            where: {
                email: req.email
            }
        });
    }
    catch(error) {
        return error;
    }
};

export const getUserByID = async (id: number) => {
    try {
        return getRepository(Drivers).findOne(id);
    }
    catch(error) {
        return error;
    }
};