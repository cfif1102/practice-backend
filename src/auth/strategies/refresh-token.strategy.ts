import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { JwtPayload } from '@@types/auth.types';
import { TokensConfig } from '@@types/config.types';
import { extractTokenFromCookies } from '@common/helpers/extract-jwt.helper';
import { EmployeeService } from '@employee/employee.service';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private readonly employeeService: EmployeeService,
        configService: ConfigService,
    ) {
        const {
            refresh: { secret },
        } = configService.get<TokensConfig>('jwt')!;

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([extractTokenFromCookies('jwt-refresh')]),
            secretOrKey: secret,
        });
    }

    async validate(payload: JwtPayload) {
        try {
            const user = await this.employeeService.findOne(payload.userId);

            return user;
        } catch {
            throw new UnauthorizedException('Not authorized');
        }
    }
}
