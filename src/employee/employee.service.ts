import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationDto } from '@common/dto/pagination.dto';
import { DataSource, Repository } from 'typeorm';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeePaginatedDto } from './dto/employee-paginated.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
    private readonly employeeRepository: Repository<Employee>;

    constructor(private readonly dataSource: DataSource) {
        this.employeeRepository = this.dataSource.getRepository(Employee);
    }

    async create(createEmployeeDto: CreateEmployeeDto) {
        const employee = this.employeeRepository.create(createEmployeeDto);

        return await this.employeeRepository.save(employee);
    }

    async findAll(paginationDto: PaginationDto) {
        const { pageSize, offset } = paginationDto;
        const [items, count] = await this.employeeRepository.findAndCount({
            skip: offset,
            take: pageSize,
        });

        return new EmployeePaginatedDto(items, count, paginationDto);
    }

    findByLogin(login: string) {
        return this.employeeRepository.findOne({ where: { login } });
    }

    async findOne(id: number) {
        const employee = await this.employeeRepository.findOne({
            where: { id },
        });

        if (!employee) {
            throw new NotFoundException(`Сотрудник с ID ${id} не найден`);
        }

        return employee;
    }

    async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
        const employee = await this.findOne(id);

        Object.assign(employee, updateEmployeeDto);

        return await this.employeeRepository.save(employee);
    }

    async remove(id: number) {
        const employee = await this.findOne(id);

        await this.employeeRepository.remove(employee);
    }
}
