import { getRepository } from 'typeorm';
import { Consumers } from '../entities/consumers';
import { IConsumerStateChange } from '../interfaces/stateChange';
import { ILoginRequest } from '../interfaces/loginRequest';

export const getAll = async () => {
    return getRepository(Consumers).find();
};

export const save = async (consumer: Consumers) => {
    return getRepository(Consumers).save(consumer);
};

export const changeConsumerState = async (req: IConsumerStateChange) => {
    try {
        const user = await getRepository(Consumers).findOne(req.id);
        if(user) {
            user.state = req.state;
        }
        return "User not found";
    }
    catch(error) {
        return error;
    }
};

export const getUser = async (req: ILoginRequest) => {
    try {
        return getRepository(Consumers).findOne(undefined, {
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
        return getRepository(Consumers).findOne(undefined, {
            where: {
                id
            }
        });
    }
    catch(error) {
        return error;
    }
}; 