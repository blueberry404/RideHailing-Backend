import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from '../interfaces/user';

export class User {

    constructor(user: IUser) {
        this.firstName = user.firstname;
        this.lastName = user.lastname;
        this.email = user.email;
        this.mobile = user.mobile;
        this.joinDate = new Date();
    }

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'character varying' })
    public firstName!: string;

    @Column({ type: 'character varying' })
    public lastName!: string;

    @Column({ type: 'timestamptz' })
    public joinDate!: Date;

    @Column({ type: 'character varying' })
    public email!: string;

    @Column({ type: 'character varying' })
    public passwordHash!: string;

    @Column({ type: 'character varying' })
    public mobile!: string;

    @Column({ type: 'character varying' })
    public profileImageURL!: string;

    @Column({ type: 'character varying' })
    public pushToken!: string;
}