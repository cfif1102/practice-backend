import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWorkshopDto {
    @ApiProperty({ description: 'Название цеха' })
    @IsString()
    @IsNotEmpty()
    name: string;
}
