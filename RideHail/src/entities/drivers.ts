import { Entity, Column, OneToMany } from 'typeorm';
import { User } from './user';
import { DriverState } from '../enums/DriverState';
import { Ride } from './ride';

@Entity()
export class Drivers extends User {

    @Column({ type: 'enum', enum: DriverState })
    public state!: DriverState;

    @OneToMany(type => Ride, ride => ride.driver)
    public rides!: Ride[]
}