import { Request } from 'express';

export const extractTokenFromCookies =
    (propName: string) =>
    (req: Request): string => {
        let token = '';

        if (req && req.cookies) {
            token = req.cookies[propName] as string;
        }

        return token;
    };
