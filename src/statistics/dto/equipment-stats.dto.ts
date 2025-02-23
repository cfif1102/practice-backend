import { ApiProperty } from '@nestjs/swagger';

import { EquipmentDto } from '@equipment/dto/equipment.dto';

export class EquipmentStatsDto {
    @ApiProperty()
    equipment: EquipmentDto;

    @ApiProperty()
    totalBreaks: number;

    @ApiProperty()
    workingTime: number;

    @ApiProperty()
    notWorkingTime: number;

    @ApiProperty()
    efficiency: number;
}
