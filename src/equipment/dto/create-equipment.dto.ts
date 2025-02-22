import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateEquipmentDto {
    @ApiProperty({ description: 'Название оборудования' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Производитель оборудования',
    })
    @IsString()
    @IsNotEmpty()
    manufacturer: string;

    @ApiProperty({ description: 'Модель оборудования' })
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty({ description: 'Инновационный номер' })
    @IsString()
    @IsNotEmpty()
    innovationNumber: string;

    @ApiProperty({ description: 'Серийный номер' })
    @IsString()
    @IsNotEmpty()
    serialNumber: string;

    @ApiProperty({ description: 'Тип, марка' })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({ description: 'Рабочий фонд' })
    @IsInt()
    workHours: number;

    @ApiProperty({ description: 'ID цеха' })
    @IsInt()
    workshopId: number;
}
