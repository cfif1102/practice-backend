import { ApiProperty } from '@nestjs/swagger';

import { Type, plainToInstance } from 'class-transformer';

import { PaginationDto } from './pagination.dto';

type ClassConstructor<T> = new (...args: any[]) => T;

export class PaginatedDto<T> {
    @ApiProperty({ isArray: true })
    @Type(() => Object)
    items: T[];

    @ApiProperty()
    nextPage?: number;

    @ApiProperty()
    prevPage?: number;

    constructor(dto: ClassConstructor<T>, items: object[], count: number, paginationDto: PaginationDto) {
        this.items = items.map((item) => plainToInstance(dto, item, { excludeExtraneousValues: true }));

        const { offset, page, pageSize } = paginationDto;

        if (count > 0 && count - page * pageSize > 0) {
            this.nextPage = page + 1;
        }

        if (count - offset > 0 && page - 1 > 0) {
            this.prevPage = page - 1;
        }
    }
}
