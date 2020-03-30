import { forEach } from 'p-iteration';
import { isArray } from "util";

import { findNearestDriver } from '../repositories/driver';
import { Job, DoneCallback } from "bull";
import { Ride } from "../entities/ride";
import { getAsync } from "../redisClient";
import { Drivers } from '../entities/drivers';
import Sockets from '../sockets';


class Processor {
    socket: Sockets;

    constructor(socket: Sockets) {
        this.socket = socket;
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
            console.log("::: inside drivers");
            forEach(drivers, async (driver: Drivers) => {
                console.log(`::: driver:: ${JSON.stringify(driver)}`);
                const dataStr = await getAsync(`${driver.id}-Driver`);
                console.log(`::: dataStr:: ${dataStr}`);
                if (dataStr) {
                    const data = JSON.parse(dataStr);
                    if (data.socketID) {
                        console.log(`::: data.socketID:: ${data.socketID}`);
                        this.socket.sendNotification(data.socketID, 'Ride Request', ride);
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
                        this.socket.sendNotification(data.socketID, 'No Ride Found', {});
                    }
                    catch (error) {
                        console.error(`notificationFindDriversResult: ${error}`);
                        //might be socket has been disconnected
                    }
                }
            }
        }
    }
}

export default Processor;
