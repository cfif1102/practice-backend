import * as path from 'path';

import { Config } from '@@types/config.types';
import { cleanEnv, str } from 'envalid';

export const config = (): Config => {
    const env = cleanEnv(process.env, {
        DB_NAME: str(),
        JWT_ACCESS_TOKEN_SECRET: str(),
        JWT_ACCESS_TOKEN_EXPIRE: str(),
        JWT_REFRESH_TOKEN_SECRET: str(),
        JWT_REFRESH_TOKEN_EXPIRE: str(),
        ADMIN_LOGIN: str(),
        ADMIN_PASSWORD: str(),
        ADMIN_NAME: str(),
        ADMIN_SURNAME: str(),
        ADMIN_MIDDLENAME: str(),
        DOCS_ENTRY_FOLDER: str(),
        DOCS_OUT_FOLDER: str(),
        DOCS_REPAIR_ACT_DOC_NAME: str(),
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
        admin: {
            login: env.ADMIN_LOGIN,
            password: env.ADMIN_PASSWORD,
            name: env.ADMIN_NAME,
            surname: env.ADMIN_SURNAME,
            middlename: env.ADMIN_MIDDLENAME,
        },
        docs: {
            repairActConfig: {
                filename: env.DOCS_REPAIR_ACT_DOC_NAME,
            },
            entryFolder: path.join(process.cwd(), env.DOCS_ENTRY_FOLDER),
            outFolder: path.join(process.cwd(), env.DOCS_OUT_FOLDER),
        },
    };
};
