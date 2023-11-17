export interface ICompetenceDatabase {
    id: number;
    name: string;
    description: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface ICompetenceDatabaseCreate {
    name: string;
    description?: string | null;
}

export interface ICompetenceDatabaseUpdate {
    name?: string;
    description?: string | null;
}
