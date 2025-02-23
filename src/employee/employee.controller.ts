import { Controller, Body, Get, Param, Delete, Query, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { Roles } from '@@types/auth.types';
import { RolesAccept } from '@auth/decorators/roles.decorator';
import { RolesGuard } from '@auth/guards/roles.guard';
import { GetUser } from '@common/decorators/extract-user.decorator';
import { Serialize } from '@common/decorators/serialize.decorator';
import { PaginationDto } from '@common/dto/pagination.dto';

import { EmployeePaginatedDto } from './dto/employee-paginated.dto';
import { EmployeeDto } from './dto/employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@ApiTags('Employees')
@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    @ApiOperation({ summary: 'Получить всех сотрудников' })
    @ApiResponse({
        status: 200,
        description: 'Список сотрудников',
        type: EmployeePaginatedDto,
    })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.employeeService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить сотрудника по ID' })
    @ApiResponse({
        status: 200,
        description: 'Сотрудник найден',
        type: EmployeeDto,
    })
    @ApiResponse({ status: 404, description: 'Сотрудник не найден' })
    @ApiParam({ name: 'id', type: Number, description: 'ID сотрудника' })
    @Serialize(EmployeeDto)
    findOne(@Param('id') id: number) {
        return this.employeeService.findOne(id);
    }

    @Patch()
    @ApiOperation({ summary: 'Обновить данные сотрудника по ID' })
    @ApiResponse({
        status: 200,
        description: 'Данные сотрудника обновлены',
        type: EmployeeDto,
    })
    @ApiResponse({ status: 404, description: 'Сотрудник не найден' })
    @ApiParam({ name: 'id', type: Number, description: 'ID сотрудника' })
    @Serialize(EmployeeDto)
    @UseGuards(AuthGuard('jwt'))
    update(@Body() updateEmployeeDto: UpdateEmployeeDto, @GetUser() user: Employee) {
        return this.employeeService.update(user.id, updateEmployeeDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить сотрудника по ID' })
    @ApiResponse({ status: 204, description: 'Сотрудник удалён' })
    @ApiResponse({ status: 404, description: 'Сотрудник не найден' })
    @ApiParam({ name: 'id', type: Number, description: 'ID сотрудника' })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @RolesAccept(Roles.Admin)
    remove(@Param('id') id: number) {
        this.employeeService.remove(id);
    }
}
