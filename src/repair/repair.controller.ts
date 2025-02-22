import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { Repair } from './entities/repair.entity';
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
        type: [Repair],
    })
    findAll() {
        return this.repairService.findMany();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить запись о ремонте по ID' })
    @ApiResponse({
        status: 200,
        description: 'Найденная запись о ремонте',
        type: Repair,
    })
    @ApiResponse({ status: 404, description: 'Ремонт не найден' })
    findOne(@Param('id') id: number) {
        return this.repairService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Создать новую запись о ремонте' })
    @ApiResponse({
        status: 201,
        description: 'Запись о ремонте успешно создана',
        type: Repair,
    })
    @ApiResponse({ status: 400, description: 'Неверные входные данные' })
    create(@Body() createRepairDto: CreateRepairDto) {
        return this.repairService.create(createRepairDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить запись о ремонте' })
    @ApiResponse({
        status: 200,
        description: 'Обновленная запись о ремонте',
        type: Repair,
    })
    @ApiResponse({ status: 404, description: 'Ремонт не найден' })
    @ApiResponse({ status: 400, description: 'Неверные входные данные' })
    update(@Param('id') id: number, @Body() updateRepairDto: UpdateRepairDto) {
        return this.repairService.update(id, updateRepairDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить запись о ремонте' })
    @ApiResponse({ status: 204, description: 'Ремонт успешно удален' })
    @ApiResponse({ status: 404, description: 'Ремонт не найден' })
    async delete(@Param('id') id: number) {
        await this.repairService.delete(id);
        return { message: 'Ремонт успешно удален' };
    }
}
