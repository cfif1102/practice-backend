import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { config } from '@config';
import { EmployeeModule } from '@employee';
import { EquipmentModule } from '@equipment';
import { TypeormModule } from '@typeorm';
import { WorkshopModule } from '@workshop';
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
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(cookieParser()).forRoutes('*');
    }
}
