import { IUser } from '../interfaces/user';
import { IDriverStatusChangeRequest } from '../interfaces/driverRequest';
import { CreateUserSchema } from '../schemas/UserSchema';
import { DriverStatusUpdateSchema } from '../schemas/DriverSchema';

export const validateSignUp = (user: IUser) => {
    const { error } = CreateUserSchema.validate(user);
    return error ? error : null;
};

export const validateDriverStatusChange = (req: IDriverStatusChangeRequest) => {
    const { error } = DriverStatusUpdateSchema.validate(req);
    return error ? error : null;
};