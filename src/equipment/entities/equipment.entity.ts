import { Repair } from '@repair/entities/repair.entity';
import { Workshop } from '@workshop/entities/workshop.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Equipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    manufacturer: string;

    @Column()
    type: string;

    @Column()
    model: string;

    @Column()
    innovationNumber: string;

    @Column()
    serialNumber: string;

    @Column()
    workHours: number;

    @OneToMany(() => Repair, (repair) => repair.equipment)
    repairs: Repair[];

    @ManyToOne(() => Workshop, (workshop) => workshop.equipments, { eager: true })
    workshop: Workshop;
}
