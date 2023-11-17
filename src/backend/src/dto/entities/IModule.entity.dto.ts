export interface IModuleEntity {
    id: number;
    name: string;
    order: number;
    description: string | null;
    course: {
        id: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface IModuleEntityCreate {
    name: string;
    description?: string | null;
    courseId: number;
    order: number;
}

export interface IModuleEntityUpdate {
    name?: string;
    description?: string | null;
    courseId?: number;
    order?: number;
}
