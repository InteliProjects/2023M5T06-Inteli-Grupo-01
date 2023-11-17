export interface IPrototypeDatabase {
    id: number;
    name: string;
    group_name: string | null;
    observation: string | null;
    project_id: number;
    github_link: string | null;
    deploy_link: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface IPrototypeDatabaseCreate {
    name: string;
    group_name?: string | null;
    observation?: string | null;
    project_id: number;
    github_link?: string | null;
    deploy_link?: string | null;
}

export interface IPrototypeDatabaseUpdate {
    name?: string;
    group_name?: string | null;
    observation?: string | null;
    project_id?: number;
    github_link?: string | null;
    deploy_link?: string | null;
}
