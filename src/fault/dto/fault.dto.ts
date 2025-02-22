import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString } from 'class-validator';

export class FaultDto {
    @ApiProperty({ description: 'ID неисправности' })
    @IsInt()
    id: number;

    @ApiProperty({
        description: 'Описание неисправности',
    })
    @IsString()
    description: string;
}
