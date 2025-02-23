import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { EmployeeModule } from '@employee/employee.module';

import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.provider';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
    imports: [EmployeeModule, PassportModule, JwtModule.registerAsync(AuthProvider)],
})
export class AuthModule {}
