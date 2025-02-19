import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Workshop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
