export type JwtPayload = {
    userId: number;
};

export enum Roles {
    Employee = 'Employee',
    Admin = 'Admin',
}

export enum Repairs {
    Operational = 'Оперативный',
    Medium = 'Средний',
    Major = 'Капитальный',
    Planned = 'Плановый',
}
