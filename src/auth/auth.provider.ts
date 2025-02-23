import { ConfigService } from '@nestjs/config';

import { TokensConfig } from '@@types/config.types';

export const AuthProvider = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.get<TokensConfig>('jwt')!;

        return {
            secret: jwtConfig.access.secret,
            signOptions: {
                expiresIn: jwtConfig.access.expire,
            },
        };
    },
};
