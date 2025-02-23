import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Roles } from '@@types/auth.types';
import { ROLES_KEY } from '@auth/decorators/roles.decorator';
import { Employee } from '@employee/entities/employee.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Roles[]>(ROLES_KEY, context.getHandler());

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const user = request.user as Employee;

        if (!requiredRoles.includes(user.role) || user.role !== Roles.Admin) {
            throw new ForbiddenException('Access denied.');
        }

        return true;
    }
}
