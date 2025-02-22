import { Module } from '@nestjs/common';

import { FaultService } from './fault.service';

@Module({
    controllers: [],
    providers: [FaultService],
    exports: [FaultService],
})
export class FaultModule {}
