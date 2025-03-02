import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

import { Repairs } from '@@types/auth.types';
import { EmployeeService } from '@employee/employee.service';
import { Employee } from '@employee/entities/employee.entity';
import { Equipment } from '@equipment/entities/equipment.entity';
import { EquipmentService } from '@equipment/equipment.service';
import { faker } from '@faker-js/faker';
import { Repair } from '@repair/entities/repair.entity';
import { RepairService } from '@repair/repair.service';
import { Workshop } from '@workshop/entities/workshop.entity';
import { WorkshopService } from '@workshop/workshop.service';
import { endOfMonth, startOfMonth } from 'date-fns';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StatsInitializer implements OnApplicationBootstrap {
    private readonly repairRepository: Repository<Repair>;
    private readonly employeeRepository: Repository<Employee>;
    private readonly equipmentRepository: Repository<Equipment>;
    private readonly workshopRepostirory: Repository<Workshop>;
    private readonly logger = new Logger(StatsInitializer.name);

    constructor(
        private readonly repairService: RepairService,
        private readonly employeeService: EmployeeService,
        private readonly equipmentService: EquipmentService,
        private readonly workshopService: WorkshopService,
        private readonly dataSouce: DataSource,
    ) {
        this.repairRepository = this.dataSouce.getRepository(Repair);
        this.employeeRepository = this.dataSouce.getRepository(Employee);
        this.equipmentRepository = this.dataSouce.getRepository(Equipment);
        this.workshopRepostirory = this.dataSouce.getRepository(Workshop);
    }

    async onApplicationBootstrap() {
        await this.initEmployees();
        await this.initWorkshops();
        await this.initEquipments();
        await this.initRepairs();

        this.logger.log('DB was initialized...');
    }

    private async initEmployees() {
        const employeeCount = await this.employeeRepository.count();

        if (!employeeCount) {
            for (let i = 0; i < 100; i++) {
                await this.employeeService.create({
                    name: faker.person.firstName(),
                    surname: faker.person.lastName(),
                    middlename: faker.person.middleName(),
                    login: faker.internet.username(),
                    password: faker.internet.password(),
                });
            }
        }
    }

    private async initWorkshops() {
        const workshopCount = await this.workshopRepostirory.count();

        if (!workshopCount) {
            for (let i = 0; i < 10; i++) {
                await this.workshopService.create({
                    name: faker.word.noun(),
                });
            }
        }
    }

    private async initEquipments() {
        const equipmentCount = await this.equipmentRepository.count();

        if (!equipmentCount) {
            for (let i = 0; i < 100; i++) {
                await this.equipmentService.create({
                    name: faker.word.noun(),
                    manufacturer: faker.company.name(),
                    model: faker.commerce.department(),
                    innovationNumber: `${faker.number.romanNumeral()}${faker.number.int({ min: 1000, max: 9999 })}`,
                    serialNumber: `${faker.number.int({ min: 1, max: 9999 })}-${faker.number.romanNumeral()}`,
                    type: `${faker.hacker.noun()}`,
                    workHours: faker.number.int({ min: 50, max: 70 }),
                    workshopId: faker.number.int({ min: 1, max: 10 }),
                });
            }
        }
    }

    private async initRepairs() {
        const repairCount = await this.repairRepository.count();
        const types = [Repairs.Operational, Repairs.Medium, Repairs.Major, Repairs.Planned];

        if (!repairCount) {
            const start = startOfMonth(new Date());
            const end = endOfMonth(new Date());

            for (let i = 0; i < 1000; i++) {
                const startDate = faker.date.between({
                    from: start,
                    to: end,
                });

                const endDate = faker.date.between({
                    from: startDate,
                    to: new Date(
                        startDate.getFullYear(),
                        startDate.getMonth(),
                        startDate.getDate() + faker.number.int({ min: 1, max: 3 }),
                        23,
                        59,
                        59,
                    ),
                });

                const size = faker.number.int({ min: 4, max: 10 });
                const faults: string[] = [];

                for (let i = 0; i < size; i++) {
                    faults.push(faker.word.words({ count: { min: 1, max: 10 } }));
                }

                await this.repairService.create({
                    startDate,
                    endDate,
                    detectedFault: faker.word.words({ count: faker.number.int({ min: 1, max: 5 }) }),
                    equipmentId: faker.number.int({ min: 1, max: 100 }),
                    employeeId: faker.number.int({ min: 1, max: 100 }),
                    faults,
                    type: types[faker.number.int({ min: 0, max: 3 })],
                });
            }
        }
    }
}
