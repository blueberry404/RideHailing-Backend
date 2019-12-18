import { Entity, Column, OneToMany } from 'typeorm';
import { User } from './user';
import { ConsumerState } from '../enums/ConsumerState';
import { Ride } from './ride';
import { IConsumer } from '../interfaces/user';

@Entity()
export class Consumers extends User {

    constructor(consumer: IConsumer| undefined = undefined) {
        super(consumer);
        this.state = ConsumerState.IDLE;
    }

    @Column({ type: 'enum', enum: ConsumerState })
    public state!: ConsumerState;

    @OneToMany(type => Ride, ride => ride.consumer)
    public rides!: Ride[];
}