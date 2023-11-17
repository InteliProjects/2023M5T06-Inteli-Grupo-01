export interface ICompetenceEntity {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICompetenceEntityCreate {
    name: string;
    description?: string | null;
}

export interface ICompetenceEntityUpdate {
    name?: string;
    description?: string | null;
}
