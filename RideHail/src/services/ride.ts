import { IBookingRequest } from "../interfaces/bookingRequest";
import { createBooking, cancelBooking } from '../repositories/ride';
import { Ride } from "../entities/ride";
import { IBookingCancelRequest } from "../interfaces/bookingCancelRequest";

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