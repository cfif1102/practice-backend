import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@auth/auth.module';
import { DbInitializer } from '@common/core/db.initializer';
import { StatsInitializer } from '@common/core/stats.initializer';
import { config } from '@config/config';
import { EmployeeModule } from '@employee/employee.module';
import { EquipmentModule } from '@equipment/equipment.module';
import { FaultModule } from '@fault/fault.module';
import { RepairModule } from '@repair/repair.module';
import { TypeormModule } from '@typeorm/typeorm.module';
import { WorkshopModule } from '@workshop/workshop.module';
import * as cookieParser from 'cookie-parser';

import { StatisticsModule } from './statistics/statistics.module';

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
        StatisticsModule,
    ],
    controllers: [],
    providers: [DbInitializer, StatsInitializer],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(cookieParser()).forRoutes('*');
    }
}
