import { getRepository } from 'typeorm';

import { Ride } from "../entities/ride";

export const createBooking = async (ride: Ride) => {
    return getRepository(Ride).save(ride);
};