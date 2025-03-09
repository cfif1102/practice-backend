import { Repairs } from '@@types/auth.types';
import { Employee } from '@employee/entities/employee.entity';
import { Equipment } from '@equipment/entities/equipment.entity';
import { Fault } from '@fault/entities/fault.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Repair {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @Column({ default: Repairs.Operational })
    type: Repairs;

    @Column({ type: 'text' })
    detectedFault: string;

    @ManyToOne(() => Employee, (employee) => employee.repairs, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @Column()
    employeeId: number;

    @ManyToOne(() => Equipment, (equipment) => equipment.repairs, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'equipmentId' })
    equipment: Equipment;

    @Column()
    equipmentId: number;

    @OneToMany(() => Fault, (fault) => fault.repair, { onDelete: 'CASCADE' })
    faults: Fault[];
}
