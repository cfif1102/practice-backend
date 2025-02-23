import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
@Controller('repairs')
export class RepairController {
    constructor(private readonly repairService: RepairService) {}

    @Get()
    @ApiOperation({ summary: 'Получить все записи о ремонтах' })
    @ApiResponse({
        status: 200,
        description: 'Список всех ремонтов',
        type: RepairPaginatedDto,
    })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.repairService.findAll(paginationDto);
    }

    @Get(':id')
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

    @Post()
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

    @Put(':id')
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

    @Delete(':id')
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
