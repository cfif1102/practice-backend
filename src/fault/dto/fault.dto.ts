import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class FaultDto {
    @ApiProperty({ description: 'ID неисправности' })
    @IsInt()
    @Expose()
    id: number;

    @ApiProperty({
        description: 'Описание неисправности',
    })
    @IsString()
    @Expose()
    description: string;
}
