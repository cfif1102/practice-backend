import { Injectable, NotFoundException } from '@nestjs/common';

import { EmployeeService } from '@employee/employee.service';
import { EquipmentService } from '@equipment/equipment.service';
import { FaultService } from '@fault/fault.service';
import { DataSource, Repository } from 'typeorm';

import { CreateRepairDto } from './dto/create-repair.dto';
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

    async findOne(id: number) {
        const repair = await this.repairRepository.findOne({ where: { id } });

        if (!repair) {
            throw new NotFoundException('Запись о ремонте не найдена.');
        }

        return repair;
    }

    findMany() {
        return this.repairRepository.find();
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
