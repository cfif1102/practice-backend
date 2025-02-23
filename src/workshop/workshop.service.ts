import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationDto } from '@common/dto/pagination.dto';
import { Repository, DataSource } from 'typeorm';

import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';
import { WorkshopPaginatedDto } from './dto/workshop-paginated.dto';
import { Workshop } from './entities/workshop.entity';

@Injectable()
export class WorkshopService {
    private readonly workshopRepository: Repository<Workshop>;

    constructor(private readonly dataSource: DataSource) {
        this.workshopRepository = this.dataSource.getRepository(Workshop);
    }

    async create(createWorkshopDto: CreateWorkshopDto) {
        const workshop = this.workshopRepository.create(createWorkshopDto);

        return await this.workshopRepository.save(workshop);
    }

    async findAll(paginationDto: PaginationDto) {
        const { pageSize, offset } = paginationDto;
        const [items, count] = await this.workshopRepository.findAndCount({
            skip: offset,
            take: pageSize,
        });

        return new WorkshopPaginatedDto(items, count, paginationDto);
    }

    async findOne(id: number) {
        const workshop = await this.workshopRepository.findOne({
            where: { id },
        });

        if (!workshop) {
            throw new NotFoundException(`Цех с ID ${id} не найден`);
        }

        return workshop;
    }

    async update(id: number, updateWorkshopDto: UpdateWorkshopDto) {
        const workshop = await this.findOne(id);

        Object.assign(workshop, updateWorkshopDto);

        return await this.workshopRepository.save(workshop);
    }

    async remove(id: number) {
        const workshop = await this.findOne(id);

        await this.workshopRepository.remove(workshop);
    }
}
