export interface IProjectCompetenceEntity {
    project: {
        id: string | number;
    };
    competence: {
        id: string | number;
    };
    value: number;
    createdAt: Date;
}

export interface IProjectCompetenceEntityCreate {
    projectId: string | number;
    competenceId: string | number;
    value: number;
}

export interface IProjectCompetenceEntityUpdate {
    projectId?: string | number;
    competenceId?: string | number;
    value?: number;
}
