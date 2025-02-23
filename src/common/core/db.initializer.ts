import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Roles } from '@@types/auth.types';
import { AdminConfig } from '@@types/config.types';
import { AuthService } from '@auth/auth.service';
import { EmployeeService } from '@employee/employee.service';

@Injectable()
export class DbInitializer implements OnApplicationBootstrap {
    constructor(
        private readonly authService: AuthService,
        private readonly employeeService: EmployeeService,
        private readonly configService: ConfigService,
    ) {}

    async onApplicationBootstrap() {
        await this.initializeAdminUser();
    }

    private async initializeAdminUser() {
        const { login, password, name, surname, middlename } = this.configService.get<AdminConfig>('admin')!;
        const adminUser = await this.employeeService.findByLogin(login);

        if (!adminUser) {
            await this.authService.signUp({
                login,
                password,
                name,
                surname,
                middlename,
                role: Roles.Admin,
            });
        }
    }
}
