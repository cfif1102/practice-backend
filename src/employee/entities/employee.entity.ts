import { Roles } from '@@types/auth.types';
import { Repair } from '@repair/entities/repair.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    middlename: string;

    @OneToMany(() => Repair, (repair) => repair.employee, { onDelete: 'CASCADE' })
    repairs: Repair[];

    @Column({ default: Roles.Employee })
    role: Roles;
}
