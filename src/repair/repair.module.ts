import { Module } from '@nestjs/common';

import { EmployeeModule } from '@employee/employee.module';
import { EquipmentModule } from '@equipment/equipment.module';
import { FaultModule } from '@fault/fault.module';

import { RepairController } from './repair.controller';
import { RepairService } from './repair.service';

@Module({
    controllers: [RepairController],
    providers: [RepairService],
    imports: [EmployeeModule, FaultModule, EquipmentModule],
    exports: [RepairService],
})
export class RepairModule {}
