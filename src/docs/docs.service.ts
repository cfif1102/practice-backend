import * as fs from 'node:fs';
import * as path from 'node:path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DocsConfig } from '@@types/config.types';
import { RepairService } from '@repair/repair.service';
import * as Docxtemplater from 'docxtemplater';
import * as Pizzip from 'pizzip';

@Injectable()
export class DocsService {
    private readonly outFolder: string;
    private readonly entryFolder: string;
    private readonly repairActDocName: string;

    constructor(
        private readonly repairService: RepairService,
        private readonly configService: ConfigService,
    ) {
        const {
            outFolder,
            entryFolder,
            repairActConfig: { filename },
        } = this.configService.get<DocsConfig>('docs')!;

        this.outFolder = outFolder;
        this.entryFolder = entryFolder;
        this.repairActDocName = filename;
    }

    async generateRepairAct(repairId: number) {
        const { repair, pred } = await this.repairService.findOneRepairWithFaults(repairId);

        const predDate = pred === null ? 'Отсутствует' : pred.startDate.toLocaleDateString();

        const data = {
            WORKSHOP: repair.equipment.workshop.name,
            REPAIR_TYPE: repair.type,
            NAME: repair.equipment.name,
            PROD: repair.equipment.manufacturer,
            MODEL: repair.equipment.model,
            INN_NUM: repair.equipment.innovationNumber,
            FAC_NUM: repair.equipment.serialNumber,
            REPAIR_DATE: new Date().toLocaleDateString(),
            YEAR: new Date().getFullYear().toString().slice(2),
            FAULTS: repair.faults.map((fault, index) => ({
                IND: index + 1,
                FAULT: fault.description,
                MARK: 'Вып.',
            })),
            PREV_REPAIR_DATE: predDate,
        };

        const result = this.writeDoc(this.repairActDocName, data);

        return result;
    }

    writeDoc(filename: string, data: Record<string, any>) {
        const templatePath = path.join(this.entryFolder, filename);
        const content = fs.readFileSync(templatePath, 'binary');
        const zip = new Pizzip(content);
        const doc = new Docxtemplater(zip, { paragraphLoop: true });

        doc.render(data);

        const outputFilename = `${Date.now()}.docx`;
        const buffer = doc.getZip().generate({ type: 'nodebuffer' });
        const outputPath = path.resolve(this.outFolder, outputFilename);

        fs.writeFileSync(outputPath, buffer);

        return { buffer, outputPath, filename: outputFilename };
    }
}
