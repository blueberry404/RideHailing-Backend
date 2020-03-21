import { Request, Response, NextFunction } from 'express';
import * as consumerService from '../services/consumer';
import * as driverService from '../services/drivers';
import * as rideService from '../services/ride';
import { Consumers } from '../entities/consumers';
import { Drivers } from '../entities/drivers';
import HTTPException from '../exceptions/HttpException';
import { Ride } from '../entities/ride';
import { queues, FIND_NEARBY_DRIVER_URL } from '../tasks/queues';
import { IBookingCancelRequest } from '../interfaces/bookingCancelRequest';
import { ConsumerState } from '../enums/ConsumerState';
import { DriverState } from '../enums/DriverState';
import Auth from '../utils/Auth';
import { IUserJWtData } from '../interfaces/user';

export const getAllConsumers = async (_request: Request, response: Response) => {
    const users = await consumerService.getAll();
    response.send({ success: true, result: users });
};

export const getAllDrivers = async (_request: Request, response: Response) => {
    const users = await driverService.getAll();
    response.send({ success: true, result: users });
};

export const createConsumer = async (request: Request, response: Response, next: NextFunction) => {
    const consumer = request.body;
    const result: any = await consumerService.saveConsumer(consumer);
    if(result instanceof Consumers) {
        response.send({ success: true, result });
    }
    else {
        next(new HTTPException(400, result));
    }
};

export const createDriver = async (request: Request, response: Response, next: NextFunction) => {
    const driver = request.body;
    const result: any = await driverService.saveDriver(driver);
    if(result instanceof Drivers) {
        response.send({ success: true, result: result });
    }
    else {
        next(new HTTPException(400, result));
    }
};

export const changeDriverStatus = async (request: Request, response: Response, next: NextFunction) => {
    const req = request.body;
    const result: any = await driverService.changeDriverStatus(req);
    if(result instanceof Drivers) {
        response.send({ success: true, message: 'Status has been updated' });
    }
    else {
        next(new HTTPException(400, result));
    }
};

export const updateDriverLocation = async (request: Request, response: Response, next: NextFunction) => {
    const req = request.body;
    const result: any = await driverService.updateDriverLocation(req);
    if(result instanceof Drivers) {
        response.send({ success: true, message: 'Status has been updated' });
    }
    else {
        next(new HTTPException(400, result));
    }
};

export const bookRide = async (request: Request, response: Response, next: NextFunction) => {
    const req = request.body;
    const booking: any = await rideService.bookRide(req);
    if(booking instanceof Ride) {
        await consumerService.changeConsumerState({
            id: booking.consumerId,
            state: ConsumerState.FINDING_RIDE
        });
        queues[FIND_NEARBY_DRIVER_URL].add({
            booking,
        });
        response.send({ success: true, result: booking });
    }
    else {
        next(new HTTPException(400, booking));
    }
};

export const cancelRide = async (request: Request, response: Response, next: NextFunction) => {
    const req  = request.body as IBookingCancelRequest;
    const cancelRideObj = await rideService.cancelRide(req);
    if(cancelRideObj instanceof Ride) {
        let errorOccured = false;
        const consumer = await consumerService.changeConsumerState({
            id: req.consumerId,
            state: ConsumerState.IDLE
        });
        if(!consumer)
            errorOccured = true;

        if(req.driverId) {
            const driver = await driverService.changeDriverStatus({
                id: req.driverId,
                state: DriverState.IDLE
            });
            if(!driver)
                errorOccured = errorOccured || true;
        }
        if(errorOccured) {
            next(new HTTPException(400, "Booking has been cancelled, but some error occured"));
        }
        else {
            response.send({ success: true, message: 'Booking has been cancelled' });
        }
    }
    else {
        next(new HTTPException(400, cancelRideObj));
    }
    
};

export const acceptRide = async (request: Request, response: Response) => {
    response.json({ success: 'success' });
};

export const startRide = async (request: Request, response: Response) => {
    response.json({ success: 'success' });
};

export const myProfile = async (request: Request, response: Response, next: NextFunction) => {

    const token = request.header("token");
    if(token) {

        try {
            const tokenDetails = await Auth.decodeJWT(token) as IUserJWtData;
            if(tokenDetails.type === 'Consumer') {
                const result = await consumerService.getConsumerProfile(+tokenDetails.id);
                if(result instanceof Consumers) {
                    const { id, firstName, lastName, state, email, mobile, profileImageURL } = result;
                    response.send({ success: true, result: { id, firstName, lastName, state, email, mobile, profileImageURL }});
                }
                else {
                    next(new HTTPException(404, result));
                }
            }
            else {
                const result = await driverService.getDriverProfile(+tokenDetails.id);
                if(result instanceof Drivers) {
                    const { id, firstName, lastName, state, email, mobile, profileImageURL } = result;
                    response.send({ success: true, result: { id, firstName, lastName, state, email, mobile, profileImageURL }});
                }
                else {
                    next(new HTTPException(404, result));
                }
            }
        }
        catch(err) {
            next(new HTTPException(401, 'Unauthorized request'));
        }
    }
    else {
        next(new HTTPException(401, 'Unauthorized request'));
    }
};

export const delAllRides = async (_request: Request, response: Response) => {
    const result = await rideService.removeAllRides();
    response.send({ success: true, result});
};

/*
Push notifications:
- find and notify Nearby Drivers
- cancel ride to other entity
- notify consumer that ride has been accepted

HOW NOTIFY USERS FOR CHANGING STATE AND LOCATION?
*/