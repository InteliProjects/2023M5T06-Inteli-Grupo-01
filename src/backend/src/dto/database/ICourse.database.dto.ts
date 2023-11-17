export interface ICourseDatabase {
    id: number;
    name: string;
    observation: string | null;
    order: number;
    created_at: Date;
    updated_at: Date;
}

export interface ICourseDatabaseCreate {
    name: string;
    observation?: string | null;
    order: number;
}

export interface ICourseDatabaseUpdate {
    name?: string;
    observation?: string | null;
    order?: number;
}
