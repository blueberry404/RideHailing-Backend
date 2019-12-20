import { DriverState } from '../enums/DriverState';

export interface IDriverStatusChangeRequest {
    id: number;
    state: DriverState;
}

export interface IDriverLocationUpdate {
    id: number,
    location: {
        latitude: number,
        longitude: number
    }
}