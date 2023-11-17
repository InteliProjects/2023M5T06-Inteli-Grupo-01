export interface IModuleDatabase {
    id: number;
    name: string;
    description: string | null;
    order: number;
    course_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface IModuleDatabaseCreate {
    name: string;
    description?: string | null;
    course_id: number;
    order: number;
}

export interface IModuleDatabaseUpdate {
    name?: string;
    description?: string | null;
    course_id?: number;
    order: number;
}
