import { ILoginRequest } from "../interfaces/loginRequest";
import { validateRequest } from "../validations/user";
import * as consumerRepo from '../repositories/consumer';
import * as driverRepo from '../repositories/driver';
import { LoginSchema } from "../schemas/UserSchema";

export const checkIfUserExists = async (req: ILoginRequest) => {
    const error = validateRequest(req, LoginSchema);
    if(error)
        return error;
    if(req.type == 'Consumer') {
        return consumerRepo.getUser(req);
    }
    else {
        return driverRepo.getUser(req);
    }
};