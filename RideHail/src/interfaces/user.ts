import { ConsumerState } from "../enums/ConsumerState";
import { DriverState } from "../enums/DriverState";

export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    mobile: string;
    imageURL: string;
    joinDate: Date;
}

export interface IConsumer extends IUser {
    state: ConsumerState;
}

export interface IDriver extends IUser {
    state: DriverState;
}