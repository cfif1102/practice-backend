import { Equipment } from '@equipment/entities/equipment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Workshop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Equipment, (equipment) => equipment.workshop)
    equipments: Equipment[];
}
