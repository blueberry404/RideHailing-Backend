import { FIND_NEARBY_DRIVER_URL } from "./queues";
import { findNearestDriver } from '../repositories/driver';
import { Job, DoneCallback, ProcessCallbackFunction } from "bull";
import { Ride } from "../entities/ride";
import { isArray } from "util";
import init from 'socket.io-emitter';
import { getRedisConfig, getAsync } from "../redisClient";

let processorInitializers: { [index: string]: ProcessCallbackFunction<any> } = {}

processorInitializers[FIND_NEARBY_DRIVER_URL] = async (job: Job<Ride>, done: DoneCallback) => {
        // job.data contains the custom data passed when the job was created
        // job.id contains id of this job.
        const ride: Ride = job.data;
        try {
            const drivers = await findNearestDriver(ride);
            if(isArray(drivers)) {
                console.log(`list:: ${drivers}`);
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
    const socket = init(getRedisConfig());
    const data = await getAsync(ride.consumerId.toString());
    /*
    // sending to individual socketid (private message)
  io.to(<socketid>).emit('private', ..);

    */
};

export default processorInitializers;