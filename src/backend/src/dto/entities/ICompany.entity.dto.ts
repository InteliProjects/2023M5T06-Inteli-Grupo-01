export interface ICompanyEntity {
    id: number;
    name: string;
    avatarFile: {
        id: number | null;
    };
    email: string;
    password: string;
    passwordSalt: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICompanyEntityCreate {
    name: string;
    avatarFileId?: number | null;
    email: string;
    password: string;
    passwordSalt: string;
}

export interface ICompanyEntityUpdate {
    name?: string;
    avatarFileId?: number | null;
    email?: string;
    password?: string;
    passwordSalt?: string;
}
