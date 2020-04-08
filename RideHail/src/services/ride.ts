import { IBookingRequest, IRideAcceptRequest } from "../interfaces/bookingRequest";
import { createBooking, cancelBooking, deleteAllEntries, acceptRideRequest } from '../repositories/ride';
import { Ride } from "../entities/ride";
import { IBookingCancelRequest } from "../interfaces/bookingCancelRequest";
import { validateRequest } from "../validations/user";
import { RideAcceptSchema } from "../schemas/RideSchema";

export const bookRide = async (booking: IBookingRequest) => {
    try {
        const ride = new Ride(booking);
        return createBooking(ride);
    } catch (error) {
        return error;
    }
};

export const cancelRide = async (req: IBookingCancelRequest) => {
    try {
        return cancelBooking(req);
    }
    catch(error) {
        return error;
    }
};

export const removeAllRides = async () => {
    return deleteAllEntries();
};

export const acceptRide = async (request: IRideAcceptRequest) => {
    try {
        const error = validateRequest(request, RideAcceptSchema);
        if(error) {
            return error;
        }
        return acceptRideRequest(request);
    }
    catch(error) {
        return error;
    }
};