import { ConsumerState } from "../enums/ConsumerState";
import { DriverState } from "../enums/DriverState";

export interface IBookingCancelRequest {
    consumerId: number,
    rideId: number,
    userType: string, //'Consumer' or 'Driver'
    driverId: number|undefined
}

const toConsumerStateChange = (consumerId: number, consumerState: string) => ({
    id: consumerId,
    state: consumerState as ConsumerState
});

const toDriverStateChange = (driverId: number, driverState: string) => ({
    id: driverId,
    state: driverState as DriverState
});