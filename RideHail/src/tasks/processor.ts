import { forEach } from 'p-iteration';
import { isArray } from "util";
import init from 'socket.io-emitter';

import { FIND_NEARBY_DRIVER_URL } from "./queues";
import { findNearestDriver } from '../repositories/driver';
import { Job, DoneCallback, ProcessCallbackFunction } from "bull";
import { Ride } from "../entities/ride";
import { getRedisConfig, getAsync } from "../redisClient";
import { Drivers } from '../entities/drivers';

let processorInitializers: { [index: string]: ProcessCallbackFunction<any> } = {}

processorInitializers[FIND_NEARBY_DRIVER_URL] = async (job: Job<Ride>, done: DoneCallback) => {
        // job.data contains the custom data passed when the job was created
        // job.id contains id of this job.
        const ride: Ride = job.data;
        try {
            const drivers = await findNearestDriver(ride);
            if(isArray(drivers)) {
                console.log(`list of drivers found:: ${drivers}`);
                notificationFindDriversResult(ride, undefined, drivers);
                done(null, drivers);
            }
            else {
                console.log(`error:: ${drivers}`);
                const err = new Error(`No drivers found. Error: ${drivers}`);
                notificationFindDriversResult(ride, err, undefined);
                done(err);
            }
            
        } catch (error) {
            done(error);
        }
};

const notificationFindDriversResult = async (ride: Ride ,err: Error | undefined, drivers: any | undefined) => {
    const io = init(getRedisConfig());
    if(drivers) {
        forEach(drivers, async (driver: Drivers) => {
            const dataStr = await getAsync(driver.id.toString());
            if(dataStr) {
                const data = JSON.parse(dataStr);
                if(data.socketID) {
                    io.to(data.socketID).emit(ride);
                }
            }
        });
    }
    else {
        const dataStr = await getAsync(ride.consumerId.toString());
        if(dataStr) {
            const data = JSON.parse(dataStr);
            if(data.socketID) {
                try {
                    io.to(data.socketID).emit({});
                }
                catch(error) {
                    //might be socket has been disconnected
                }
            }
        }
    }
};

export default processorInitializers;