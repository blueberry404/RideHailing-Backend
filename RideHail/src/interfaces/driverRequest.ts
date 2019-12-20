import { DriverState } from '../enums/DriverState';

export interface IDriverStatusChangeRequest {
    id: number;
    state: DriverState;
}