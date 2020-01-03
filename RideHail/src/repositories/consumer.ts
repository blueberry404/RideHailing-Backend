import { getRepository } from 'typeorm';
import { Consumers } from '../entities/consumers';
import { IConsumerStateChange } from '../interfaces/stateChange';

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