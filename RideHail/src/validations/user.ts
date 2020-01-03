import { IUser } from '../interfaces/user';
import { IDriverLocationUpdate } from '../interfaces/driverRequest';
import { CreateUserSchema } from '../schemas/UserSchema';
import { DriverStatusUpdateSchema, DriverLocationUpdateSchema } from '../schemas/DriverSchema';
import { IDriverStateChange } from '../interfaces/stateChange';

export const validateSignUp = (user: IUser) => {
    const { error } = CreateUserSchema.validate(user);
    return error ? error : null;
};

export const validateDriverStatusChange = (req: IDriverStateChange) => {
    const { error } = DriverStatusUpdateSchema.validate(req);
    return error ? error : null;
};

export const validateDriverLocationUpdate = (req: IDriverLocationUpdate) => {
    const { error } = DriverLocationUpdateSchema.validate(req);
    return error ? error : null;
};