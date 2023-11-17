export interface ICourseEntity {
    id: number;
    name: string;
    observation: string | null;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICourseEntityCreate {
    name: string;
    observation?: string | null;
    order: number;
}

export interface ICourseEntityUpdate {
    name?: string;
    observation?: string | null;
    order?: number;
}
