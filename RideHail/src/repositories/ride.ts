import { getRepository } from 'typeorm';

import { Ride } from "../entities/ride";
import { IBookingCancelRequest } from '../interfaces/bookingCancelRequest';

export const createBooking = async (ride: Ride) => {
    return getRepository(Ride).save(ride);
};

export const cancelBooking = async (req: IBookingCancelRequest) => {
    const ride = await getRepository(Ride).findOne(req.rideId);
    if(ride) {
        ride.isCancelled = true;
        return getRepository(Ride).save(ride);
    }
    return 'Ride not found';
};