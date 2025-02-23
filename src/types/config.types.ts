export type Config = {
    db: DbConfig;
    jwt: TokensConfig;
    admin: AdminConfig;
};

export type DbConfig = {
    database: string;
};

export type JwtConfig = {
    secret: string;
    expire: string;
};

export type TokensConfig = {
    access: JwtConfig;
    refresh: JwtConfig;
};

export type AdminConfig = {
    login: string;
    password: string;
    name: string;
    surname: string;
    middlename: string;
};
