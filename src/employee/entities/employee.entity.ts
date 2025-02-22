import { Repair } from '@repair/entities/repair.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    middlename: string;

    @OneToMany(() => Repair, (repair) => repair.employee)
    repairs: Repair[];
}
