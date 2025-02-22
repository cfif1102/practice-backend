import { Module } from '@nestjs/common';

import { WorkshopModule } from '@workshop/workshop.module';

import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';

@Module({
    controllers: [EquipmentController],
    providers: [EquipmentService],
    imports: [WorkshopModule],
    exports: [EquipmentService],
})
export class EquipmentModule {}
