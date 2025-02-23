export type Config = {
    db: DbConfig;
    jwt: TokensConfig;
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
