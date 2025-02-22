import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsInt, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateRepairDto {
    @ApiProperty({ description: 'Дата начала ремонта' })
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: 'Дата окончания ремонта', required: false })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ description: 'Выявленная неисправность' })
    @IsString()
    detectedFault: string;

    @ApiProperty({ description: 'ID оборудования' })
    @Type(() => Number)
    @IsInt()
    equipmentId: number;

    @ApiProperty({ description: 'Список неисправностей', type: [String] })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    faults?: string[];

    employeeId: number = 1;
}
