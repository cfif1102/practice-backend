import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { FaultDto } from '@fault/dto/fault.dto';
import { Type } from 'class-transformer';
import { IsArray, ArrayMinSize, ValidateNested, IsOptional, ArrayNotEmpty, IsString } from 'class-validator';

import { CreateRepairDto } from './create-repair.dto';

export class UpdateRepairDto extends PartialType(OmitType(CreateRepairDto, ['faults'])) {
    @ApiProperty({
        description: 'Список неисправностей (для обновления)',
        type: [FaultDto],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => FaultDto)
    faults?: FaultDto[];

    @ApiProperty({
        description: 'Список неисправностей (новые)',
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    newFaults?: string[];
}
