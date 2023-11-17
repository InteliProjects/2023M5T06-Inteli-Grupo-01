import {
    IConditionInput,
    IOrders,
    IPagination,
} from '../../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import { ICompanyEntity } from '../../dto/entities/ICompany.entity.dto';
import { IProjectEntity, IProjectEntityCreate, IProjectEntityUpdate } from '../../dto/entities/IProject.entity.dto';
import ApiError from '../../infra/config/apiError/ApiError.config';
import ProjectRepository from '../../repositories/project/Project.repository';
import Service from '../Service';

export default class ProjectService extends Service<
    IProjectEntity,
    IProjectEntityCreate,
    IProjectEntityUpdate,
    ProjectRepository
> {
    async listWithCompany(): Promise<(IProjectEntity & { company: ICompanyEntity })[]> {
        return this.entityDatabaseToEntity(await this.repository.listWithCompany());
    }

    async listWithModuleCompanyAndClass(
        filters?: IConditionInput,
        orders?: IOrders,
        pagination?: IPagination,
    ): Promise<any[]> {
        return this.entityDatabaseToEntity(
            await this.repository.listWithModuleCompanyAndClass(filters, orders, pagination),
        );
    }

    async listCountWithModuleCompanyAndClass(filters?: IConditionInput | undefined): Promise<{ qt: number } | null> {
        return this.entityDatabaseToEntity(await this.repository.listCountWithModuleCompanyAndClass(filters));
    }

    async listWithModuleCompanyClassTeachersAndCompetences(
        filters?: IConditionInput,
        orders?: IOrders,
        pagination?: IPagination,
    ) {
        const projects = await this.listWithModuleCompanyAndClass(filters, orders, pagination);
        const teachers = this.entityDatabaseToEntity(await this.repository.listTeachers()) as any[];
        const competences = this.entityDatabaseToEntity(await this.repository.listCompetences()) as any[];

        const projectsWithTeachersAndCompetences = projects.map((project) => {
            project.teachers = teachers.filter((teacher) => teacher?.project?.id === project.id);
            project.competences = competences.filter((competence) => competence?.project?.id === project.id);
            return project;
        });

        return projectsWithTeachersAndCompetences;
    }

    async findWithModuleCompanyClassTeachersAndCompetences(filters?: IConditionInput): Promise<IProjectEntity | null> {
        const project = (await this.listWithModuleCompanyAndClass(filters, undefined, { pageSize: 1, page: 1 }))[0];

        if (!project) {
            throw new ApiError('Not Found', 404);
        }

        const teachers = this.entityDatabaseToEntity(await this.repository.listTeachers(filters)) as any[];
        const competences = this.entityDatabaseToEntity(await this.repository.listCompetences(filters)) as any[];

        const projectWithTeachersAndCompetences = {
            ...project,
            teachers: teachers.filter((teacher) => teacher?.project?.id === project.id),
            competences: competences.filter((competence) => competence?.project?.id === project.id),
        };

        return projectWithTeachersAndCompetences;
    }
}
