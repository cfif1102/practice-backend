import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';
import { EquipmentService } from './equipment.service';

@ApiTags('Equipment')
@Controller('equipments')
export class EquipmentController {
    constructor(private readonly equipmentService: EquipmentService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новое оборудование' })
    @ApiResponse({
        status: 201,
        description: 'Оборудование успешно создано',
        type: Equipment,
    })
    async create(@Body() createEquipmentDto: CreateEquipmentDto) {
        return this.equipmentService.create(createEquipmentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить всё оборудование' })
    @ApiResponse({
        status: 200,
        description: 'Список оборудования',
        type: [Equipment],
    })
    findAll() {
        return this.equipmentService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить оборудование по ID' })
    @ApiResponse({
        status: 200,
        description: 'Оборудование найдено',
        type: Equipment,
    })
    @ApiResponse({ status: 404, description: 'Оборудование не найдено' })
    @ApiParam({ name: 'id', type: Number, description: 'ID оборудования' })
    findOne(@Param('id') id: number) {
        return this.equipmentService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить оборудование по ID' })
    @ApiResponse({
        status: 200,
        description: 'Оборудование обновлено',
        type: Equipment,
    })
    @ApiResponse({ status: 404, description: 'Оборудование не найдено' })
    @ApiParam({ name: 'id', type: Number, description: 'ID оборудования' })
    update(
        @Param('id') id: number,
        @Body() updateEquipmentDto: UpdateEquipmentDto,
    ) {
        return this.equipmentService.update(id, updateEquipmentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить оборудование по ID' })
    @ApiResponse({ status: 204, description: 'Оборудование удалено' })
    @ApiResponse({ status: 404, description: 'Оборудование не найдено' })
    @ApiParam({ name: 'id', type: Number, description: 'ID оборудования' })
    remove(@Param('id') id: number) {
        this.equipmentService.remove(id);
    }
}
