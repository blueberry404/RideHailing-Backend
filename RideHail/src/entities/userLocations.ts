import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Ride } from "./ride";

@Entity('UserLocations')
export class UserLocations {

    @PrimaryGeneratedColumn()
    public id!: number

    @Column({ type: 'datetime' })
    public timestamp!: Date

    @Column('simple-json')
    public location!: { latitude: number, longitude: number }

    @ManyToOne(type => Ride, ride => ride.locations)
    public ride!: Ride
}