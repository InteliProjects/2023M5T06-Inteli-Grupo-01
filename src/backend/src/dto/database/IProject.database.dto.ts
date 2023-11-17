export interface IProjectDatabase {
    id: number;
    name: string;
    description: string | null;
    status: string;
    company_id: number;
    module_id: number;
    class_id: number;
    tapi_file_id: number | null;
    agreement_file_id: number | null;
    created_at: Date;
    updated_at: Date;
}

export interface IProjectDatabaseCreate {
    name: string;
    description?: string | null;
    status: string;
    company_id: number;
    module_id: number;
    class_id: number;
    tapi_file_id?: number | null;
    agreement_file_id?: number | null;
}

export interface IProjectDatabaseUpdate {
    name?: string;
    description?: string | null;
    status?: string;
    company_id?: number;
    module_id?: number;
    class_id?: number;
    tapi_file_id?: number | null;
    agreement_file_id?: number | null;
}
