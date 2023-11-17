import {
    IConditionInput,
    IOrders,
    IPagination,
} from '../../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import { ICourseEntity } from '../../dto/entities/ICourse.entity.dto';
import { IModuleEntity, IModuleEntityCreate, IModuleEntityUpdate } from '../../dto/entities/IModule.entity.dto';
import ApiError from '../../infra/config/apiError/ApiError.config';
import ModuleRepository from '../../repositories/module/Module.repository';
import Service from '../Service';

export default class ModuleService extends Service<
    IModuleEntity,
    IModuleEntityCreate,
    IModuleEntityUpdate,
    ModuleRepository
> {
    async listWithCourse(
        filters?: IConditionInput,
        orders?: IOrders,
        pagination?: IPagination,
    ): Promise<(IModuleEntity & { course: ICourseEntity })[]> {
        return this.entityDatabaseToEntity(await this.repository.listWithCourse(filters, orders, pagination));
    }

    async listCountWithCourse(filters?: IConditionInput | undefined): Promise<{ qt: number } | null> {
        return this.entityDatabaseToEntity(await this.repository.listCountWithCourse(filters));
    }

    async listWithCourseAndCompetences(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination) {
        const modules = await this.listWithCourse(filters, orders, pagination);

        const competences = this.entityDatabaseToEntity(await this.repository.listCompetences()) as any[];

        const modulesWithCompetences = modules.map((module) => {
            return {
                ...module,
                competences: competences.filter((competence) => competence?.module?.id === module.id),
            };
        });

        return modulesWithCompetences;
    }

    async findWithCourseAndCompetences(filters?: IConditionInput) {
        const module = (await this.listWithCourse(filters, undefined, { page: 1, pageSize: 1 }))[0];

        if (!module) {
            throw new ApiError('Not found', 404);
        }

        const competences = this.entityDatabaseToEntity(await this.repository.listCompetences(filters)) as any[];

        const moduleWithCompetences = {
            ...module,
            competences: competences.filter((competence) => competence?.module?.id === module.id),
        };

        return moduleWithCompetences;
    }
}
