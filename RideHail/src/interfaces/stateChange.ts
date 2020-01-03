import { ConsumerState } from "../enums/ConsumerState";
import { DriverState } from "../enums/DriverState";

export interface IConsumerStateChange {
    id: number,
    state: ConsumerState
}

export interface IDriverStateChange {
    id: number,
    state: DriverState
}