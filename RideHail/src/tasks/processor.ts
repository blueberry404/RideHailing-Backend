import { forEach } from 'p-iteration';
import { isArray } from "util";
import { RedisClient } from 'redis';

import { findNearestDriver } from '../repositories/driver';
import { Job, DoneCallback } from "bull";
import { Ride } from "../entities/ride";
import { getAsync } from "../redisClient";
import { Drivers } from '../entities/drivers';
import * as RedisManager from '../redisClient';
import { IRideAcceptRequest } from '../interfaces/bookingRequest';

class Processor {
    client: RedisClient

    constructor(redisClient: RedisClient) {
        this.client = redisClient;
        this.findDriver = this.findDriver.bind(this);
        this.notificationFindDriversResult = this.notificationFindDriversResult.bind(this);
    }

    async findDriver(job: Job<Ride>, done: DoneCallback) {
        // job.data contains the custom data passed when the job was created
        // job.id contains id of this job.
        const ride: Ride = job.data;//job.data;
        try {
            const drivers = await findNearestDriver(ride);
            if (isArray(drivers)) {
                console.log(`list of drivers found:: ${JSON.stringify(drivers)}`);
                this.notificationFindDriversResult(ride, undefined, drivers);
                done(null, drivers);
            }
            else {
                console.log(`error:: ${drivers}`);
                const err = new Error(`No drivers found. Error: ${drivers}`);
                this.notificationFindDriversResult(ride, err, undefined);
                done(err);
            }

        } catch (error) {
            console.error(`processorInitializers: ${error}`);
            done(error);
        }
    }

    private async notificationFindDriversResult(ride: Ride, err: Error | undefined, drivers: any | undefined) {
        
        if (drivers) {
            forEach(drivers, async (driver: Drivers) => {
                const dataStr = await getAsync(`${driver.id}-Driver`);
                if (dataStr) {
                    const data = JSON.parse(dataStr);
                    if (data.socketID) {
                        const payload = {socketID: data.socketID, payload: ride};
                        RedisManager.messenger.publish(RedisManager.EVENT_RIDE_REQUEST, JSON.stringify(payload));
                    }
                }
            });
        }
        else {
            const dataStr = await getAsync(`${ride.consumerId}-Consumer`);
            if (dataStr) {
                const data = JSON.parse(dataStr);
                if (data.socketID) {
                    try {
                        RedisManager.messenger.publish(RedisManager.EVENT_NO_DRIVER_FOUND, JSON.stringify({}));
                    }
                    catch (error) {
                        console.error(`notificationFindDriversResult: ${error}`);
                        //might be socket has been disconnected
                    }
                }
            }
        }
    }

    async notifyClientAboutRideAcceptanceByDriver(job: Job<IRideAcceptRequest>, done: DoneCallback) {
        const request = job.data;
        console.log("******** notifyClientAboutRideAcceptanceByDriver");
        console.log(JSON.stringify(request));
        const dataStr = await getAsync(`${request.consumerId}-Consumer`);
        if (dataStr) {
            console.log("DATA STR found");
            const data = JSON.parse(dataStr);
            if (data.socketID) {
                console.log("SOCKET ID found");
                const payload = { socketID: data.socketID, payload: "" };
                RedisManager.messenger.publish(RedisManager.EVENT_DRIVER_ACCEPTED_RIDE, JSON.stringify(payload));
            }
            else {
                console.log("SOCKET ID NOt found");
            }
        }
        else {
            console.log("**** NO DATASTR FOUND");
        }
        done()
    }
}

export default Processor;
