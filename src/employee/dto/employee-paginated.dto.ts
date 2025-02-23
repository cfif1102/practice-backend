import { ApiProperty } from '@nestjs/swagger';

import { PaginatedDto } from '@common/dto/paginated.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { Employee } from '@employee/entities/employee.entity';
import { Type } from 'class-transformer';

import { EmployeeDto } from './employee.dto';

export class EmployeePaginatedDto extends PaginatedDto<EmployeeDto, Employee> {
    @ApiProperty({ type: () => [EmployeeDto] })
    @Type(() => EmployeeDto)
    declare items: EmployeeDto[];

    constructor(items: Employee[], count: number, paginationDto: PaginationDto) {
        super(EmployeeDto, items, count, paginationDto);
    }
}
