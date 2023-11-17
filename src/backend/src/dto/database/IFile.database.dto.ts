export interface IFileDatabase {
    id: number;
    link: string;
    bucket: string;
    path: string;
    type: string;
    created_at: Date;
    updated_at: Date;
}

export interface IFileDatabaseCreate {
    link: string;
    bucket: string;
    path: string;
    type: string;
}

export interface IFileDatabaseUpdate {
    link?: string;
    bucket?: string;
    path?: string;
    type?: string;
}
