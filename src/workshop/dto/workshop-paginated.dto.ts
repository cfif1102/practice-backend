import { ApiProperty } from '@nestjs/swagger';

import { PaginatedDto } from '@common/dto/paginated.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { Workshop } from '@workshop/entities/workshop.entity';
import { Type } from 'class-transformer';

import { WorkshopDto } from './workshop.dto';

export class WorkshopPaginatedDto extends PaginatedDto<WorkshopDto, Workshop> {
    @ApiProperty({ type: () => [WorkshopDto] })
    @Type(() => WorkshopDto)
    declare items: WorkshopDto[];

    constructor(items: Workshop[], count: number, paginationDto: PaginationDto) {
        super(WorkshopDto, items, count, paginationDto);
    }
}
