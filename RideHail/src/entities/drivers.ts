import { Entity, Column, OneToMany } from 'typeorm';
import { User } from './user';
import { DriverState } from '../enums/DRIVERState';
import { Ride } from './ride';

@Entity('Drivers')
export class Drivers extends User {

    @Column({ type: 'enum', enum: DriverState, default: DriverState.NOT_AVAILABLE })
    public state: DriverState = DriverState.NOT_AVAILABLE;

    @OneToMany(type => Ride, ride => ride.driver)
    public rides: Ride[] = []
}