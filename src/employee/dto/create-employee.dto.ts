import { ApiProperty } from '@nestjs/swagger';

import { Roles } from '@@types/auth.types';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
    @ApiProperty({ description: 'Логин сотрудника' })
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({ description: 'Пароль сотрудника' })
    @IsString()
    @IsNotEmpty()
    password: string;

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

    role?: Roles = Roles.Employee;
}
