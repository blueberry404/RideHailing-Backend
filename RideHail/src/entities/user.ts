import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class User {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'character varying' })
    public firstName!: string;

    @Column({ type: 'character varying' })
    public lastName!: string;

    @Column({ type: 'datetime' })
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