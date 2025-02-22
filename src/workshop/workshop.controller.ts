import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';
import { Workshop } from './entities/workshop.entity';
import { WorkshopService } from './workshop.service';

@ApiTags('Workshops')
@Controller('workshops')
export class WorkshopController {
    constructor(private readonly workshopService: WorkshopService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новый цех' })
    @ApiResponse({
        status: 201,
        description: 'Цех успешно создан',
        type: Workshop,
    })
    create(@Body() createWorkshopDto: CreateWorkshopDto) {
        return this.workshopService.create(createWorkshopDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все цеха' })
    @ApiResponse({ status: 200, description: 'Список цехов', type: [Workshop] })
    findAll() {
        return this.workshopService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить цех по ID' })
    @ApiResponse({ status: 200, description: 'Цех найден', type: Workshop })
    @ApiResponse({ status: 404, description: 'Цех не найден' })
    @ApiParam({ name: 'id', type: Number, description: 'ID цеха' })
    findOne(@Param('id') id: number) {
        return this.workshopService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить данные цеха по ID' })
    @ApiResponse({
        status: 200,
        description: 'Данные цеха обновлены',
        type: Workshop,
    })
    @ApiResponse({ status: 404, description: 'Цех не найден' })
    @ApiParam({ name: 'id', type: Number, description: 'ID цеха' })
    update(@Param('id') id: number, @Body() updateWorkshopDto: UpdateWorkshopDto) {
        return this.workshopService.update(id, updateWorkshopDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить цех по ID' })
    @ApiResponse({ status: 204, description: 'Цех удалён' })
    @ApiResponse({ status: 404, description: 'Цех не найден' })
    @ApiParam({ name: 'id', type: Number, description: 'ID цеха' })
    remove(@Param('id') id: number) {
        return this.workshopService.remove(id);
    }
}
