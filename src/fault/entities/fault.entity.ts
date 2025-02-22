import { Repair } from '@repair/entities/repair.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Fault {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    description: string;

    @ManyToOne(() => Repair, (repair) => repair.faults)
    repair: Repair;
}
