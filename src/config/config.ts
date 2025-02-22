import { Config } from '@@types/config.types';
import { cleanEnv, str } from 'envalid';

export const config = (): Config => {
    const env = cleanEnv(process.env, {
        DB_NAME: str(),
    });

    return {
        db: {
            database: env.DB_NAME,
        },
    };
};
