import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { DocsService } from './docs.service';

@Controller('docs')
export class DocsController {
    constructor(private readonly docsService: DocsService) {}

    @Get('/repair-act/:repairId')
    @ApiOperation({ summary: 'Генерирует документ акт сдачи оборудования в ремонт' })
    @ApiOkResponse({ description: 'Документ о сдаче оборудования в ремонт' })
    @ApiNotFoundResponse({ description: 'Запись о ремонте не была найдена.' })
    async generateRepairAct(@Param('repairId') repairId: number) {
        const { buffer, filename } = await this.docsService.generateRepairAct(repairId);

        return new StreamableFile(buffer, {
            disposition: `attachment; filename="${filename}"`,
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
    }
}
