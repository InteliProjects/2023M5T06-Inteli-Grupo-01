export interface IModuleCompetenceEntity {
    module: {
        id: number;
    };
    competence: {
        id: number;
    };
    createdAt: Date;
}

export interface IModuleCompetenceEntityCreate {
    moduleId: number;
    competenceId: number;
}

export interface IModuleCompetenceEntityUpdate {
    moduleId?: number;
    competenceId?: number;
}
