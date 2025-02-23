import { Config } from '@@types/config.types';
import { cleanEnv, str } from 'envalid';

export const config = (): Config => {
    const env = cleanEnv(process.env, {
        DB_NAME: str(),
        JWT_ACCESS_TOKEN_SECRET: str(),
        JWT_ACCESS_TOKEN_EXPIRE: str(),
        JWT_REFRESH_TOKEN_SECRET: str(),
        JWT_REFRESH_TOKEN_EXPIRE: str(),
    });

    return {
        db: {
            database: env.DB_NAME,
        },
        jwt: {
            access: {
                secret: env.JWT_ACCESS_TOKEN_SECRET,
                expire: env.JWT_ACCESS_TOKEN_EXPIRE,
            },
            refresh: {
                secret: env.JWT_REFRESH_TOKEN_SECRET,
                expire: env.JWT_REFRESH_TOKEN_EXPIRE,
            },
        },
    };
};
