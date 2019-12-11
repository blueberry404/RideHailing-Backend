import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne } from "typeorm";
import { UserLocations } from "./userLocations";
import { Consumers } from "./consumers";
import { Drivers } from "./drivers";

@Entity()
export class Ride {
    
    @PrimaryGeneratedColumn()
    public rideID!: number

    @Column({ type: 'datetime' })
    public bookingDate!: Date

    @Column({ type: 'datetime' })
    public startRideTime!: Date

    @Column({ type: 'datetime' })
    public endRideTime!: Date

    @Column({ type: 'double' })
    public distance: number = 0

    @Column({ type: 'double' })
    public amountCharged : number = 0

    @OneToMany(type => UserLocations, location => location.ride)
    public locations: UserLocations[] = []

    @ManyToOne(type => Consumers, consumer => consumer.rides)
    public consumer!: Consumers

    @ManyToOne(type => Drivers, driver => driver.rides)
    public driver!: Drivers
}