import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { Serialize } from '@common/decorators/serialize.decorator';
import { PaginationDto } from '@common/dto/pagination.dto';

import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { EquipmentPaginatedDto } from './dto/equipment-paginated.dto';
import { EquipmentDto } from './dto/equipment.dto';
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
        type: EquipmentDto,
    })
    @Serialize(EquipmentDto)
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() createEquipmentDto: CreateEquipmentDto) {
        return this.equipmentService.create(createEquipmentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить всё оборудование' })
    @ApiResponse({
        status: 200,
        description: 'Список сотрудников',
        type: EquipmentPaginatedDto,
    })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.equipmentService.findAll(paginationDto);
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
    @Serialize(EquipmentDto)
    findOne(@Param('id') id: number) {
        return this.equipmentService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить оборудование по ID' })
    @ApiResponse({
        status: 200,
        description: 'Оборудование обновлено',
        type: EquipmentDto,
    })
    @ApiResponse({ status: 404, description: 'Оборудование не найдено' })
    @ApiParam({ name: 'id', type: Number, description: 'ID оборудования' })
    @Serialize(EquipmentDto)
    @UseGuards(AuthGuard('jwt'))
    update(@Param('id') id: number, @Body() updateEquipmentDto: UpdateEquipmentDto) {
        return this.equipmentService.update(id, updateEquipmentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить оборудование по ID' })
    @ApiResponse({ status: 204, description: 'Оборудование удалено' })
    @ApiResponse({ status: 404, description: 'Оборудование не найдено' })
    @ApiParam({ name: 'id', type: Number, description: 'ID оборудования' })
    @UseGuards(AuthGuard('jwt'))
    remove(@Param('id') id: number) {
        this.equipmentService.remove(id);
    }
}
