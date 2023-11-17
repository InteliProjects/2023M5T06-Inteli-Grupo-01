export interface IInitiativeCompetenceEntity {
    initiative: {
        id: string | number;
    };
    competence: {
        id: string | number;
    };
    value: number;
    createdAt: Date;
}

export interface IInitiativeCompetenceEntityCreate {
    initiativeId: string | number;
    competenceId: string | number;
    value: number;
}

export interface IInitiativeCompetenceEntityUpdate {
    initiativeId?: string | number;
    competenceId?: string | number;
    number?: number;
}
