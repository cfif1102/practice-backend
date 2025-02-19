import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
    @ApiProperty({ description: 'Имя сотрудника' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Фамилия сотрудника' })
    @IsString()
    @IsNotEmpty()
    surname: string;

    @ApiProperty({ description: 'Отчество сотрудника' })
    @IsString()
    middlename: string;
}
