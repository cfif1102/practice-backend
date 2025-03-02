import { Module } from '@nestjs/common';

import { RepairModule } from '@repair/repair.module';

import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';

@Module({
    controllers: [DocsController],
    providers: [DocsService],
    imports: [RepairModule],
})
export class DocsModule {}
