import { ILoginRequest } from "../interfaces/loginRequest";
import { validateLogin } from "../validations/user";
import * as consumerRepo from '../repositories/consumer';
import * as driverRepo from '../repositories/driver';

export const checkIfUserExists = async (req: ILoginRequest) => {
    const error = validateLogin(req);
    if(error)
        return error;
    if(req.type == 'Consumer') {
        return consumerRepo.getUser(req);
    }
    else {
        return driverRepo.getUser(req);
    }
};