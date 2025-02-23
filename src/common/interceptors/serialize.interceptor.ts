import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const handler = context.getHandler();
        const dtoClass = this.reflector.get('dto', handler);

        return next.handle().pipe(
            map((data) => {
                if (!dtoClass) {
                    return data;
                }

                return plainToInstance(dtoClass, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}
