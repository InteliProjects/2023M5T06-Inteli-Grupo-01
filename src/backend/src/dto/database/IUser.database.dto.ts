export interface IUserDatabase {
    id: number;
    name: string;
    email: string;
    password: string;
    password_salt: string;
    created_at: Date;
    updated_at: Date;
}

export interface IUserDatabaseCreate {
    name: string;
    email: string;
    password: string;
    password_salt: string;
}

export interface IUserDatabaseUpdate {
    name?: string;
    email?: string;
    password?: string;
    password_salt?: string;
}
