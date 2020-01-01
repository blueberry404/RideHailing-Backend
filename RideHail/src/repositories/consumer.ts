import { getRepository } from 'typeorm';
import { Consumers } from '../entities/consumers';

export const getAll = async () => {
    return getRepository(Consumers).find();
};

export const save = async (consumer: Consumers) => {
    return getRepository(Consumers).save(consumer);
};
