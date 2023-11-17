export interface ITeacherEntity {
    id: number;
    name: string;
    email: string;
    observation: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITeacherEntityCreate {
    name: string;
    email: string;
    observation?: string | null;
}

export interface ITeacherEntityUpdate {
    name?: string;
    email?: string;
    observation?: string | null;
}
