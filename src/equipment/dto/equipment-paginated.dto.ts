import { ApiProperty } from '@nestjs/swagger';

import { PaginatedDto } from '@common/dto/paginated.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { Equipment } from '@equipment/entities/equipment.entity';
import { Type } from 'class-transformer';

import { EquipmentDto } from './equipment.dto';

export class EquipmentPaginatedDto extends PaginatedDto<EquipmentDto, Equipment> {
    @ApiProperty({ type: () => [EquipmentDto] })
    @Type(() => EquipmentDto)
    declare items: EquipmentDto[];

    constructor(items: Equipment[], count: number, paginationDto: PaginationDto) {
        super(EquipmentDto, items, count, paginationDto);
    }
}
