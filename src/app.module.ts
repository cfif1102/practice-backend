import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { config } from '@config/config';
import { EmployeeModule } from '@employee/employee.module';
import { EquipmentModule } from '@equipment/equipment.module';
import { FaultModule } from '@fault/fault.module';
import { RepairModule } from '@repair/repair.module';
import { TypeormModule } from '@typeorm/typeorm.module';
import { WorkshopModule } from '@workshop/workshop.module';
import { AuthModule } from './auth/auth.module';
import * as cookieParser from 'cookie-parser';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true,
        }),
        TypeormModule,
        EquipmentModule,
        EmployeeModule,
        WorkshopModule,
        RepairModule,
        FaultModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(cookieParser()).forRoutes('*');
    }
}
