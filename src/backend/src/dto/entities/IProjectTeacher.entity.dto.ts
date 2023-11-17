export interface IProjectTeacherEntity {
    project: {
        id: string | number;
    };
    teacher: {
        id: string | number;
    };
    role: string | null;
    createdAt: Date;
}

export interface IProjectTeacherEntityCreate {
    projectId: string | number;
    teacherId: string | number;
    role: string | null;
}

export interface IProjectTeacherEntityUpdate {
    projectId?: string | number;
    teacherId?: string | number;
    role?: string | null;
}
