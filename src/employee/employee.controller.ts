import { Controller, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

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
        type: [Employee],
    })
    findAll() {
        return this.employeeService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить сотрудника по ID' })
    @ApiResponse({
        status: 200,
        description: 'Сотрудник найден',
        type: Employee,
    })
    @ApiResponse({ status: 404, description: 'Сотрудник не найден' })
    @ApiParam({ name: 'id', type: Number, description: 'ID сотрудника' })
    findOne(@Param('id') id: number) {
        return this.employeeService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить данные сотрудника по ID' })
    @ApiResponse({
        status: 200,
        description: 'Данные сотрудника обновлены',
        type: Employee,
    })
    @ApiResponse({ status: 404, description: 'Сотрудник не найден' })
    @ApiParam({ name: 'id', type: Number, description: 'ID сотрудника' })
    update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
        return this.employeeService.update(id, updateEmployeeDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить сотрудника по ID' })
    @ApiResponse({ status: 204, description: 'Сотрудник удалён' })
    @ApiResponse({ status: 404, description: 'Сотрудник не найден' })
    @ApiParam({ name: 'id', type: Number, description: 'ID сотрудника' })
    remove(@Param('id') id: number) {
        this.employeeService.remove(id);
    }
}
