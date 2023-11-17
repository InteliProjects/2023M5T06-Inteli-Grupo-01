export interface IUserEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    passwordSalt: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserEntityCreate {
    name: string;
    email: string;
    password: string;
    passwordSalt: string;
}

export interface IUserEntityUpdate {
    name?: string;
    email?: string;
    password?: string;
    passwordSalt?: string;
}
