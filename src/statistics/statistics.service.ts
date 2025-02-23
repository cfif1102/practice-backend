import { Injectable } from '@nestjs/common';

import { EquipmentDto } from '@equipment/dto/equipment.dto';
import { Equipment } from '@equipment/entities/equipment.entity';
import { Repair } from '@repair/entities/repair.entity';
import { WorkshopDto } from '@workshop/dto/workshop.dto';
import { Workshop } from '@workshop/entities/workshop.entity';
import { plainToInstance } from 'class-transformer';
import { endOfMonth, getDaysInMonth, startOfMonth } from 'date-fns';
import { Between, DataSource, Repository } from 'typeorm';

import { EquipmentStatsDto } from './dto/equipment-stats.dto';
import { WorkshopStatsDto } from './dto/workshop-stats.dto';
import { IEquipmentStat } from './interfaces/equipment-stat.interface';

@Injectable()
export class StatisticsService {
    private equipmentRepository: Repository<Equipment>;
    private workshopRepository: Repository<Workshop>;
    private repairRepository: Repository<Repair>;

    constructor(private readonly dataSource: DataSource) {
        this.equipmentRepository = this.dataSource.getRepository(Equipment);
        this.workshopRepository = this.dataSource.getRepository(Workshop);
        this.repairRepository = this.dataSource.getRepository(Repair);
    }

    async calcParamsForEquipments(equipmentsIds: IEquipmentStat[]) {
        const eqStats: EquipmentStatsDto[] = [];

        for (const { equipmentId, repairCount } of equipmentsIds) {
            const repairs = await this.repairRepository.find({
                where: { equipmentId },
            });

            let notWorkedTime = 0;

            for (const repair of repairs) {
                const time = (+repair.endDate - +repair.startDate) / (1000 * 60 * 60);

                notWorkedTime += time;
            }

            const equipment = await this.equipmentRepository.findOneOrFail({ where: { id: equipmentId } });

            const equipmentDto = plainToInstance(EquipmentDto, equipment);
            const workingTime = getDaysInMonth(new Date()) * equipment.workHours;
            const efficiency = (1 - notWorkedTime / workingTime) * 100;

            eqStats.push({
                equipment: equipmentDto,
                totalBreaks: repairCount,
                workingTime,
                notWorkingTime: notWorkedTime,
                efficiency,
            });
        }

        return eqStats;
    }

    async findEquipmentsForWorkshop(workshopId: number) {
        const topEquipment = await this.equipmentRepository
            .createQueryBuilder('equipment')
            .select('equipment.id', 'equipmentId')
            .addSelect('COUNT(repair.id)', 'repairCount')
            .leftJoin('equipment.repairs', 'repair')
            .where('equipment.workshopId = :workshopId', { workshopId })
            .groupBy('equipment.id')
            .orderBy('COUNT(repair.id)', 'DESC')
            .limit(10)
            .getRawMany();

        return topEquipment;
    }

    async getStatsByTopEquipments() {
        const start = startOfMonth(new Date());
        const end = endOfMonth(new Date());

        const equipmentsIds = await this.repairRepository
            .createQueryBuilder('repair')
            .select('repair.equipmentId', 'equipmentId')
            .addSelect('COUNT(repair.id)', 'repairCount')
            .where({
                startDate: Between(start, end),
            })
            .groupBy('repair.equipmentId')
            .orderBy('repairCount', 'DESC')
            .limit(10)
            .getRawMany();

        const stats = await this.calcParamsForEquipments(equipmentsIds);

        return stats;
    }

    async getStatsByWorkshops() {
        const workshops = await this.workshopRepository.find();
        const stats: WorkshopStatsDto[] = [];

        for (const workshop of workshops) {
            const workshopDto = plainToInstance(WorkshopDto, workshop);
            const equipmentIds = await this.findEquipmentsForWorkshop(workshop.id);

            const equipmentStats = await this.calcParamsForEquipments(equipmentIds);

            stats.push({
                workshop: workshopDto,
                equipments: equipmentStats,
            });
        }

        return stats;
    }
}
