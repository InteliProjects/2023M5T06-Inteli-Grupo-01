export interface IProjectCompetenceDatabase {
    project_id: string | number;
    competence_id: string | number;
    value: number;
    created_at: Date;
}

export interface IProjectCompetenceDatabaseCreate {
    project_id: string | number;
    competence_id: string | number;
    value: number;
}

export interface IProjectCompetenceDatabaseUpdate {
    project_id?: string | number;
    competence_id?: string | number;
    number?: number;
}
