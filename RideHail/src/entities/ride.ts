import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne } from "typeorm";
import { UserLocations } from "./userLocations";
import { Consumers } from "./consumers";
import { Drivers } from "./drivers";

@Entity()
export class Ride {
    
    @PrimaryGeneratedColumn()
    public rideID!: number

    @Column()
    public bookingDate!: Date

    @Column()
    public startRideTime!: Date

    @Column()
    public endRideTime!: Date

    @Column()
    public distance: number = 0

    @Column()
    public amountCharged : number = 0

    @OneToMany(type => UserLocations, location => location.ride)
    public locations!: UserLocations[]

    @ManyToOne(type => Consumers, consumer => consumer.rides)
    public consumer!: Consumers

    @ManyToOne(type => Drivers, driver => driver.rides)
    public driver!: Drivers
}