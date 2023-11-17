export interface IFileEntity {
    id: number;
    link: string;
    bucket: string;
    path: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IFileEntityCreate {
    link: string;
    bucket: string;
    path: string;
    type: string;
}

export interface IFileEntityUpdate {
    link?: string;
    bucket?: string;
    path?: string;
    type?: string;
}
