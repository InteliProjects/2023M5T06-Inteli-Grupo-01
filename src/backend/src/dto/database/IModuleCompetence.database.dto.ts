export interface IModuleCompetenceDatabase {
    module_id: number;
    competence_id: number;
    created_at: Date;
}

export interface IModuleCompetenceDatabaseCreate {
    module_id: number;
    competence_id: number;
}

export interface IModuleCompetenceDatabaseUpdate {
    module_id?: number;
    competence_id?: number;
}
