export interface IClassDatabase {
    id: number;
    name: string;
    status: string;
    course_id: number;
    student_quantity: number | null;
    current_module_id: number | null;
    created_at: Date;
    updated_at: Date;
}

export interface IClassDatabaseCreate {
    name: string;
    status: string;
    course_id: number;
    student_quantity?: number | null;
    current_module_id?: number | null;
}

export interface IClassDatabaseUpdate {
    name?: string;
    status?: string;
    course_id?: number;
    student_quantity?: number | null;
    current_module_id?: number | null;
}
