import { ApiProperty } from '@nestjs/swagger';

import { PaginatedDto } from '@common/dto/paginated.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { Repair } from '@repair/entities/repair.entity';
import { Type } from 'class-transformer';

import { RepairDto } from './repair.dto';

export class RepairPaginatedDto extends PaginatedDto<RepairDto, Repair> {
    @ApiProperty({ type: () => [RepairDto] })
    @Type(() => RepairDto)
    declare items: RepairDto[];

    constructor(items: Repair[], count: number, paginationDto: PaginationDto) {
        super(RepairDto, items, count, paginationDto);
    }
}
