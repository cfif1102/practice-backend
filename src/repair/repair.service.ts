import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationDto } from '@common/dto/pagination.dto';
import { EmployeeService } from '@employee/employee.service';
import { EquipmentService } from '@equipment/equipment.service';
import { FaultService } from '@fault/fault.service';
import { DataSource, LessThan, Repository } from 'typeorm';

import { CreateRepairDto } from './dto/create-repair.dto';
import { RepairPaginatedDto } from './dto/repair-paginated.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { Repair } from './entities/repair.entity';

@Injectable()
export class RepairService {
    private readonly repairRepository: Repository<Repair>;

    constructor(
        private readonly dataSource: DataSource,
        private readonly employeeService: EmployeeService,
        private readonly faultService: FaultService,
        private readonly equipmentService: EquipmentService,
    ) {
        this.repairRepository = this.dataSource.getRepository(Repair);
    }

    async findOneRepairWithFaults(id: number) {
        const repair = await this.repairRepository.findOne({
            where: { id },
            relations: {
                faults: true,
            },
        });

        if (!repair) {
            throw new NotFoundException('Запись о ремонте не найдена.');
        }

        const pred = await this.repairRepository.findOne({
            where: { id, startDate: LessThan(repair.startDate) },
            relations: {
                faults: true,
            },
            order: {
                startDate: 'ASC',
            },
        });

        return { repair, pred };
    }

    async findByEquipment(id: number, paginationDto: PaginationDto) {
        await this.equipmentService.findOne(id);

        const { pageSize, offset } = paginationDto;
        const [items, count] = await this.repairRepository.findAndCount({
            skip: offset,
            take: pageSize,
            where: { equipmentId: id },
        });

        return new RepairPaginatedDto(items, count, paginationDto);
    }

    async findOne(id: number) {
        const repair = await this.repairRepository.findOne({ where: { id } });

        if (!repair) {
            throw new NotFoundException('Запись о ремонте не найдена.');
        }

        return repair;
    }

    async findAll(paginationDto: PaginationDto) {
        const { pageSize, offset } = paginationDto;
        const [items, count] = await this.repairRepository.findAndCount({
            skip: offset,
            take: pageSize,
        });

        return new RepairPaginatedDto(items, count, paginationDto);
    }

    async create(createRepairDto: CreateRepairDto) {
        const { startDate, endDate, detectedFault, equipmentId, faults, employeeId } = createRepairDto;

        const equipment = await this.equipmentService.findOne(equipmentId);
        const employee = await this.employeeService.findOne(employeeId);

        const repairPlain = this.repairRepository.create({
            startDate,
            endDate,
            detectedFault,
            employee,
            equipment,
        });

        if (faults) {
            const faultsCreated = await this.faultService.createFromArray(faults);

            repairPlain.faults = faultsCreated;
        }

        return this.repairRepository.save(repairPlain);
    }

    async update(id: number, updateRepairDto: UpdateRepairDto) {
        const { startDate, endDate, detectedFault, equipmentId, faults, employeeId, newFaults } = updateRepairDto;

        const repair = await this.findOne(id);

        if (equipmentId) {
            const equipment = await this.equipmentService.findOne(equipmentId);

            repair.equipment = equipment;
        }

        if (employeeId) {
            const employee = await this.employeeService.findOne(employeeId);

            repair.employee = employee;
        }

        if (faults) {
            await this.faultService.updateFromArray(faults);
        }

        if (newFaults) {
            const faultsCreated = await this.faultService.createFromArray(newFaults);

            repair.faults.push(...faultsCreated);
        }

        Object.assign(repair, { startDate, endDate, detectedFault });

        return this.repairRepository.save(repair);
    }

    async delete(id: number) {
        const repair = await this.findOne(id);

        await this.repairRepository.remove(repair);
    }
}
