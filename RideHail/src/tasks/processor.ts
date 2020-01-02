import { FIND_NEARBY_DRIVER_URL } from "./queues";
import { findNearestDriver } from '../repositories/driver';
import { Job, DoneCallback, ProcessCallbackFunction } from "bull";
import { Ride } from "../entities/ride";
import { isArray } from "util";

let processorInitializers: { [index: string]: ProcessCallbackFunction<any> } = {}

processorInitializers[FIND_NEARBY_DRIVER_URL] = async (job: Job<Ride>, done: DoneCallback) => {
        // job.data contains the custom data passed when the job was created
        // job.id contains id of this job.
        const ride: Ride = job.data;
        try {
            const drivers = await findNearestDriver(ride);
            if(isArray(drivers)) {
                console.log(`list:: ${drivers}`);
                done(null, drivers);
            }
            else {
                console.log(`error:: ${drivers}`);
                done(new Error(`No drivers found. Error: ${drivers}`));
            }
            
        } catch (error) {
            done(error);
        }
};

export default processorInitializers;