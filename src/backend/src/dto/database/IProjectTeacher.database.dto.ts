export interface IProjectTeacherDatabase {
    project_id: string | number;
    teacher_id: string | number;
    role: string | null;
    created_at: Date;
}

export interface IProjectTeacherDatabaseCreate {
    project_id: string | number;
    teacher_id: string | number;
    role: string | null;
}

export interface IProjectTeacherDatabaseUpdate {
    project_id?: string | number;
    teacher_id?: string | number;
    number?: number;
}
