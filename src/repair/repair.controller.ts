import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { Roles } from '@@types/auth.types';
import { RolesAccept } from '@auth/decorators/roles.decorator';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Serialize } from '@common/decorators/serialize.decorator';
import { PaginationDto } from '@common/dto/pagination.dto';

import { CreateRepairDto } from './dto/create-repair.dto';
import { RepairPaginatedDto } from './dto/repair-paginated.dto';
import { RepairDto } from './dto/repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { RepairService } from './repair.service';

@ApiTags('Repair')
@Controller()
export class RepairController {
    constructor(private readonly repairService: RepairService) {}

    @Get('/equipments/:equipmentId/repairs')
    @ApiOperation({ summary: 'Получить записи о ремонтах у оборудования' })
    @ApiOkResponse({ description: 'Список ремонтов', type: RepairPaginatedDto })
    @ApiNotFoundResponse({ description: 'Оборудование не было найдено' })
    @ApiBadRequestResponse({ description: 'Неверные данные' })
    findByEquipments(@Param('equipmentId') equipmentId: number, @Query() paginationDto: PaginationDto) {
        return this.repairService.findByEquipment(equipmentId, paginationDto);
    }

    @Get('/repairs')
    @ApiOperation({ summary: 'Получить все записи о ремонтах' })
    @ApiResponse({
        status: 200,
        description: 'Список всех ремонтов',
        type: RepairPaginatedDto,
    })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.repairService.findAll(paginationDto);
    }

    @Get('/repairs/:id')
    @ApiOperation({ summary: 'Получить запись о ремонте по ID' })
    @ApiResponse({
        status: 200,
        description: 'Найденная запись о ремонте',
        type: RepairDto,
    })
    @ApiResponse({ status: 404, description: 'Ремонт не найден' })
    @Serialize(RepairDto)
    findOne(@Param('id') id: number) {
        return this.repairService.findOne(id);
    }

    @Post('/repairs')
    @ApiOperation({ summary: 'Создать новую запись о ремонте' })
    @ApiResponse({
        status: 201,
        description: 'Запись о ремонте успешно создана',
        type: RepairDto,
    })
    @ApiResponse({ status: 400, description: 'Неверные входные данные' })
    @Serialize(RepairDto)
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createRepairDto: CreateRepairDto) {
        return this.repairService.create(createRepairDto);
    }

    @Put('/repairs/:id')
    @ApiOperation({ summary: 'Обновить запись о ремонте' })
    @ApiResponse({
        status: 200,
        description: 'Обновленная запись о ремонте',
        type: RepairDto,
    })
    @ApiResponse({ status: 404, description: 'Ремонт не найден' })
    @ApiResponse({ status: 400, description: 'Неверные входные данные' })
    @Serialize(RepairDto)
    @UseGuards(AuthGuard('jwt'))
    update(@Param('id') id: number, @Body() updateRepairDto: UpdateRepairDto) {
        return this.repairService.update(id, updateRepairDto);
    }

    @Delete('/repairs/:id')
    @ApiOperation({ summary: 'Удалить запись о ремонте' })
    @ApiResponse({ status: 204, description: 'Ремонт успешно удален' })
    @ApiResponse({ status: 404, description: 'Ремонт не найден' })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @RolesAccept(Roles.Admin)
    async delete(@Param('id') id: number) {
        await this.repairService.delete(id);
        return { message: 'Ремонт успешно удален' };
    }
}
