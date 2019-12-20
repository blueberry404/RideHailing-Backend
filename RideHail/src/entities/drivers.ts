import { Entity, Column, OneToMany } from 'typeorm';
import { User } from './user';
import { DriverState } from '../enums/DriverState';
import { Ride } from './ride';
import { IDriver } from '../interfaces/user';

@Entity()
export class Drivers extends User {

    constructor(consumer: IDriver| undefined = undefined) {
        super(consumer);
        this.state = DriverState.NOT_AVAILABLE;
    }

    @Column({ type: 'enum', enum: DriverState })
    public state!: DriverState;

    @Column('json')
    public location!: { latitude: number, longitude: number }

    @OneToMany(type => Ride, ride => ride.driver)
    public rides!: Ride[]
}