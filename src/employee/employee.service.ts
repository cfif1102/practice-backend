import { Injectable, NotFoundException } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { CreateEmployeeDto } from './dto/create-employee.dto';
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

    findAll() {
        return this.employeeRepository.find();
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
