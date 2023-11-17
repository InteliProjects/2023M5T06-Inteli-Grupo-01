export interface ITeacherDatabase {
    id: number;
    name: string;
    email: string;
    observation: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface ITeacherDatabaseCreate {
    name: string;
    email: string;
    observation?: string | null;
}

export interface ITeacherDatabaseUpdate {
    name?: string;
    email?: string;
    observation?: string | null;
}
