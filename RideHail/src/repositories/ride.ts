import { getRepository } from 'typeorm';

import { Ride } from "../entities/ride";
import { IBookingCancelRequest } from '../interfaces/bookingCancelRequest';
import { IRideAcceptRequest } from '../interfaces/bookingRequest';

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

export const deleteAllEntries = async () => {
    return getRepository(Ride).clear();
};

export const save = async (ride: Ride) => {
    return getRepository(Ride).save(ride);
};

export const acceptRideRequest = async (req: IRideAcceptRequest) => {
    const ride = await getRepository(Ride).findOne(req.rideId);
    if (ride) {
        if(ride.driverId != null) {
            return "Ride has been accepted by someone else";
        }
        ride.driverId = req.driverId;
        return save(ride);
    }
    return 'Ride not found';
};
