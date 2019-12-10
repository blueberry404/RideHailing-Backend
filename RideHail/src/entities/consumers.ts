import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Consumers')
export class Consumers {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'character varying' })
    public firstName: string;

    @Column({ type: 'character varying' })
    public lastName: string;

    @Column({ type: 'datetime' })
    public joinDate: Date;

    @Column({ type: 'character varying' })
    public email: string;

    @Column({ type: 'character varying' })
    public password: string;

    @Column({ type: 'character varying' })
    public mobile: string;

    @Column({ type: 'character varying' })
    public profileImageURL: string;

    @Column({ type: 'character varying' })
    public pushToken: string;

    @Column({ type: 'character varying' })
    public state: string;
}