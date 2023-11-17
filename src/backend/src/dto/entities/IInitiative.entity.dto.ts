export interface IInitiativeEntity {
    id: number;
    name: string;
    description: string | null;
    observation: string | null;
    status: string;
    company: {
        id: number;
    };
    module: {
        id: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface IInitiativeEntityCreate {
    name: string;
    description?: string | null;
    observation?: string | null;
    status: string;
    companyId: number;
    moduleId: number;
}

export interface IInitiativeEntityUpdate {
    name?: string;
    description?: string | null;
    observation?: string | null;
    status?: string;
    companyId?: number;
    moduleId?: number;
}
