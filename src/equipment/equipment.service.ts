import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationDto } from '@common/dto/pagination.dto';
import { WorkshopService } from '@workshop/workshop.service';
import { DataSource, Repository } from 'typeorm';

import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { EquipmentPaginatedDto } from './dto/equipment-paginated.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
    private readonly equipmentRepository: Repository<Equipment>;

    constructor(
        private readonly dataSource: DataSource,
        private readonly workshopService: WorkshopService,
    ) {
        this.equipmentRepository = this.dataSource.getRepository(Equipment);
    }

    async create(createEquipmentDto: CreateEquipmentDto) {
        const workshop = await this.workshopService.findOne(createEquipmentDto.workshopId);
        const equipment = this.equipmentRepository.create({ ...createEquipmentDto, workshop });

        return await this.equipmentRepository.save(equipment);
    }

    async findAll(paginationDto: PaginationDto) {
        const { pageSize, offset } = paginationDto;
        const [items, count] = await this.equipmentRepository.findAndCount({
            skip: offset,
            take: pageSize,
        });

        const dto = new EquipmentPaginatedDto(items, count, paginationDto);

        dto.items = [];

        return dto;
    }

    async findOne(id: number) {
        const equipment = await this.equipmentRepository.findOne({
            where: { id },
        });

        if (!equipment) {
            throw new NotFoundException(`Оборудование с ID ${id} не найдено`);
        }

        return equipment;
    }

    async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
        const equipment = await this.findOne(id);

        if (updateEquipmentDto.workshopId) {
            const workshop = await this.workshopService.findOne(updateEquipmentDto.workshopId);

            equipment.workshop = workshop;
        }

        Object.assign(equipment, updateEquipmentDto);

        return await this.equipmentRepository.save(equipment);
    }

    async remove(id: number) {
        const equipment = await this.findOne(id);

        await this.equipmentRepository.remove(equipment);
    }
}
