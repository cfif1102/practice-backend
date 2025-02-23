import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { EquipmentStatsDto } from './dto/equipment-stats.dto';
import { WorkshopStatsDto } from './dto/workshop-stats.dto';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @Get('/equipments')
    @ApiOperation({ summary: 'Получить статистику по оборудованию' })
    @ApiOkResponse({ type: [EquipmentStatsDto] })
    getByEquipments() {
        return this.statisticsService.getStatsByTopEquipments();
    }

    @Get('/workshops')
    @ApiOperation({ summary: 'Получить статистику по цехам' })
    @ApiOkResponse({ type: [WorkshopStatsDto] })
    getByWorkshops() {
        return this.statisticsService.getStatsByWorkshops();
    }
}
