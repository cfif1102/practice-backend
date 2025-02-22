import { Injectable, NotFoundException } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { CreateFaultDto } from './dto/create-fault.dto';
import { FaultDto } from './dto/fault.dto';
import { UpdateFaultDto } from './dto/update-fault.dto';
import { Fault } from './entities/fault.entity';

@Injectable()
export class FaultService {
    private readonly faultRepository: Repository<Fault>;

    constructor(private dataSource: DataSource) {
        this.faultRepository = this.dataSource.getRepository(Fault);
    }

    create(createFaultDto: CreateFaultDto) {
        const faultPlain = this.faultRepository.create(createFaultDto);

        return this.faultRepository.save(faultPlain);
    }

    async createFromArray(faults: string[]) {
        const faultsCreated: Fault[] = [];

        for (const fault of faults) {
            const faultCreated = await this.create({
                description: fault,
            });

            faultsCreated.push(faultCreated);
        }

        return faultsCreated;
    }

    async updateFromArray(faults: FaultDto[]) {
        for (const faultDto of faults) {
            const { id, description } = faultDto;

            await this.update(id, { description });
        }
    }

    async update(id: number, updateFaultDto: UpdateFaultDto) {
        const fault = await this.findOne(id);

        Object.assign(fault, updateFaultDto);

        return this.faultRepository.save(fault);
    }

    async findOne(id: number) {
        const fault = await this.faultRepository.findOne({ where: { id } });

        if (!fault) {
            throw new NotFoundException('Неисправность не найдена');
        }

        return fault;
    }

    findMany() {
        return this.faultRepository.find();
    }

    async delete(id: number) {
        const fault = await this.findOne(id);

        await this.faultRepository.remove(fault);
    }
}
