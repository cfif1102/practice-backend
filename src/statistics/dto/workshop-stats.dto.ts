import { ApiProperty } from '@nestjs/swagger';

import { WorkshopDto } from '@workshop/dto/workshop.dto';

import { EquipmentStatsDto } from './equipment-stats.dto';

export class WorkshopStatsDto {
    @ApiProperty()
    workshop: WorkshopDto;

    @ApiProperty({ type: [EquipmentStatsDto] })
    equipments: EquipmentStatsDto[];
}
