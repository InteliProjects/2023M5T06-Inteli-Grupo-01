export interface IInitiativeCompetenceDatabase {
    initiative_id: string | number;
    competence_id: string | number;
    value: number;
    created_at: Date;
}

export interface IInitiativeCompetenceDatabaseCreate {
    initiative_id: string | number;
    competence_id: string | number;
    value: number;
}

export interface IInitiativeCompetenceDatabaseUpdate {
    initiative_id?: string | number;
    competence_id?: string | number;
    number?: number;
}
