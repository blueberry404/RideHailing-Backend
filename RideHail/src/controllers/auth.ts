import { Request, Response, NextFunction } from 'express';
import { checkIfUserExists } from '../services/auth';
import { User } from '../entities/user';
import HTTPException from '../exceptions/HttpException';
import Auth from '../utils/Auth';
import { ILoginRequest } from '../interfaces/loginRequest';

export const login = async (request: Request, response: Response, next: NextFunction) => {
    const req = request.body;
    const user = await checkIfUserExists(req);
    if(user instanceof User) {
        try {
            const loginReq = req as ILoginRequest
            const isSame = await Auth.comparePasswords(loginReq.password, user.passwordHash);
            if(isSame) {
                const token = await Auth.generateJWT(user, loginReq.type);
                if(token instanceof Error) {
                    next(new HTTPException(500, "Some error occured"));
                }
                else
                    response.send({ success: true, result: { message: 'Success Login', token  } });
            }
            else
                next(new HTTPException(404, "Invalid credentials"));

        } catch (error) {
            next(new HTTPException(500, "Some error occured while authenticating"));
        }
        
    }
    else if(user instanceof Error) {
        next(new HTTPException(400, user.message));
    }
    else {
        next(new HTTPException(404, "User not found"));
    }
};
