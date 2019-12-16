import { getRepository } from 'typeorm';
import { Drivers } from '../entities/drivers';

export const getAll = async () => {
    return getRepository(Drivers).find();
};

export const save = async (driver: Drivers) => {
    return getRepository(Drivers).save(driver);
};