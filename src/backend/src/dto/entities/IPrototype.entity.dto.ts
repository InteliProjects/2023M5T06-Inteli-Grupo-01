export interface IPrototypeEntity {
    id: number;
    name: string;
    groupName: string | null;
    observation: string | null;
    project: {
        id: number;
    };
    githubLink: string | null;
    deployLink: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPrototypeEntityCreate {
    name: string;
    groupName?: string | null;
    observation?: string | null;
    projectId: number;
    githubLink?: string | null;
    deployLink?: string | null;
}

export interface IPrototypeEntityUpdate {
    name?: string;
    groupName?: string | null;
    observation?: string | null;
    projectId?: number;
    githubLink?: string | null;
    deployLink?: string | null;
}
