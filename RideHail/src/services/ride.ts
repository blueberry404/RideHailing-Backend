import { IBookingRequest } from "../interfaces/bookingRequest";
import { createBooking } from '../repositories/ride';
import { Ride } from "../entities/ride";

export const bookRide = async (booking: IBookingRequest) => {
    try {
        const ride = new Ride(booking);
        return createBooking(ride);
    } catch (error) {
        return error;
    }
};