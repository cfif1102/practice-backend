import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Equipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    manufacturer: string;

    @Column()
    model: string;

    @Column({ unique: true })
    innovationNumber: string;

    @Column({ unique: true })
    serialNumber: string;
}
