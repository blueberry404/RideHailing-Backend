import { IUser } from '../interfaces/user';
import { CreateUserSchema } from '../schemas/UserSchema';

export const validateSignUp = (user: IUser) => {
    const { error } = CreateUserSchema.validate(user);
    return error ? error : null;
};