export interface IInitiativeDatabase {
    id: number;
    name: string;
    description: string | null;
    observation: string | null;
    status: string;
    company_id: number;
    module_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface IInitiativeDatabaseCreate {
    name: string;
    description?: string | null;
    observation?: string | null;
    status: string;
    company_id: number;
    module_id: number;
}

export interface IInitiativeDatabaseUpdate {
    name?: string;
    description?: string | null;
    observation?: string | null;
    status?: string;
    company_id?: number;
    module_id?: number;
}
