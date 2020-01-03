import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne } from "typeorm";
import { UserLocations } from "./userLocations";
import { Consumers } from "./consumers";
import { Drivers } from "./drivers";
import { IBookingRequest } from "../interfaces/bookingRequest";

@Entity()
export class Ride {

    constructor(bookingReq: IBookingRequest|undefined = undefined) {
        if(bookingReq) {
            this.bookingDate = new Date();
            this.sourceLocation = { latitude: bookingReq.sourceLat, longitude: bookingReq.sourceLong };
            this.destLocation = { latitude: bookingReq.destLat, longitude: bookingReq.destLong };
            this.consumerId = bookingReq.userId;
        }
    }
    
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

    @Column('json')
    public sourceLocation!: { latitude: number, longitude: number }

    @Column('json')
    public destLocation!: { latitude: number, longitude: number }

    @Column()
    public isCancelled: Boolean = false

    @OneToMany(type => UserLocations, location => location.ride)
    public locations!: UserLocations[]

    @ManyToOne(type => Consumers, consumer => consumer.rides)
    public consumer!: Consumers

    @Column()
    public consumerId!: number

    @ManyToOne(type => Drivers, driver => driver.rides)
    public driver!: Drivers

    @Column({ nullable: true })
    public driverId!: number
}