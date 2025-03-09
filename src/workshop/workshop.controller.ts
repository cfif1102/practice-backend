import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiParam, ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { Roles } from '@@types/auth.types';
import { RolesAccept } from '@auth/decorators/roles.decorator';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Serialize } from '@common/decorators/serialize.decorator';
import { PaginationDto } from '@common/dto/pagination.dto';

import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';
import { WorkshopPaginatedDto } from './dto/workshop-paginated.dto';
import { WorkshopDto } from './dto/workshop.dto';
import { WorkshopService } from './workshop.service';

@ApiTags('Workshops')
@Controller('workshops')
export class WorkshopController {
    constructor(private readonly workshopService: WorkshopService) {}

    @Get('/all')
    @ApiOperation({ summary: 'Список всех цехов' })
    @ApiOkResponse({ description: 'Все цеха', type: [WorkshopDto] })
    @Serialize(WorkshopDto)
    findMany() {
        return this.workshopService.findMany();
    }

    @Post()
    @ApiOperation({ summary: 'Создать новый цех' })
    @ApiResponse({
        status: 201,
        description: 'Цех успешно создан',
        type: WorkshopDto,
    })
    @Serialize(WorkshopDto)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @RolesAccept(Roles.Admin)
    create(@Body() createWorkshopDto: CreateWorkshopDto) {
        return this.workshopService.create(createWorkshopDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все цеха' })
    @ApiResponse({ status: 200, description: 'Список цехов', type: WorkshopPaginatedDto })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.workshopService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить цех по ID' })
    @ApiResponse({ status: 200, description: 'Цех найден', type: WorkshopDto })
    @ApiResponse({ status: 404, description: 'Цех не найден' })
    @ApiParam({ name: 'id', type: Number, description: 'ID цеха' })
    @Serialize(WorkshopDto)
    findOne(@Param('id') id: number) {
        return this.workshopService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить данные цеха по ID' })
    @ApiResponse({
        status: 200,
        description: 'Данные цеха обновлены',
        type: WorkshopDto,
    })
    @ApiResponse({ status: 404, description: 'Цех не найден' })
    @ApiParam({ name: 'id', type: Number, description: 'ID цеха' })
    @Serialize(WorkshopDto)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @RolesAccept(Roles.Admin)
    update(@Param('id') id: number, @Body() updateWorkshopDto: UpdateWorkshopDto) {
        return this.workshopService.update(id, updateWorkshopDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить цех по ID' })
    @ApiResponse({ status: 204, description: 'Цех удалён' })
    @ApiResponse({ status: 404, description: 'Цех не найден' })
    @ApiParam({ name: 'id', type: Number, description: 'ID цеха' })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @RolesAccept(Roles.Admin)
    remove(@Param('id') id: number) {
        return this.workshopService.remove(id);
    }
}
