import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

export class EmployeeDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    surname: string;

    @ApiProperty()
    @Expose()
    middlename: string;
}
