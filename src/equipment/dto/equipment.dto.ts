import { ApiProperty } from '@nestjs/swagger';

import { WorkshopDto } from '@workshop/dto/workshop.dto';
import { Expose, Type } from 'class-transformer';

export class EquipmentDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    manufacturer: string;

    @ApiProperty()
    @Expose()
    type: string;

    @ApiProperty()
    @Expose()
    model: string;

    @ApiProperty()
    @Expose()
    innovationNumber: string;

    @ApiProperty()
    @Expose()
    serialNumber: string;

    @ApiProperty()
    @Expose()
    workHours: number;

    @ApiProperty({ type: () => WorkshopDto })
    @Expose()
    @Type(() => WorkshopDto)
    workshop: WorkshopDto;
}
