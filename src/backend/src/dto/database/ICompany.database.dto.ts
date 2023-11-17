export interface ICompanyDatabase {
    id: number;
    name: string;
    avatar_file_id: number | null;
    email: string;
    password: string;
    password_salt: string;
    created_at: Date;
    updated_at: Date;
}

export interface ICompanyDatabaseCreate {
    name: string;
    avatar_file_id?: number | null;
    email: string;
    password: string;
    password_salt: string;
}

export interface ICompanyDatabaseUpdate {
    name?: string;
    avatar_file_id?: number | null;
    email?: string;
    password?: string;
    password_salt?: string;
}
