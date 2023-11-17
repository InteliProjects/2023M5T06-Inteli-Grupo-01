import {
    IConditionInput,
    IOrders,
    IPagination,
} from '../../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import {
    IInitiativeEntity,
    IInitiativeEntityCreate,
    IInitiativeEntityUpdate,
} from '../../dto/entities/IInitiative.entity.dto';
import ApiError from '../../infra/config/apiError/ApiError.config';
import InitiativeRepository from '../../repositories/initiative/Initiative.repository';
import Service from '../Service';

export default class InitiativeService extends Service<
    IInitiativeEntity,
    IInitiativeEntityCreate,
    IInitiativeEntityUpdate,
    InitiativeRepository
> {
    listWithModuleAndCompany = async (filters?: IConditionInput, orders?: IOrders, pagination?: IPagination) => {
        const inititiatives = await this.repository.listWithModuleAndCompany(filters, orders, pagination);
        return this.entityDatabaseToEntity(inititiatives);
    };

    listCountWithModuleAndCompany = async (filters?: IConditionInput) => {
        return this.entityDatabaseToEntity(await this.repository.listCountWithModuleAndCompany(filters));
    };

    async listWithModuleCompanyAndCompetences(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination) {
        const initiatives = (await this.listWithModuleAndCompany(filters, orders, pagination)) as any[];

        const competences = this.entityDatabaseToEntity(await this.repository.listCompetences()) as any[];

        const initiativesWithCompetences = initiatives.map((initiative) => {
            initiative.competences = competences.filter((competence) => competence?.initiative?.id === initiative.id);
            return initiative;
        });

        return initiativesWithCompetences;
    }

    async findWithModuleCompanyAndCompetences(filters?: IConditionInput) {
        const initiative = (
            await this.listWithModuleAndCompany(filters, undefined, {
                page: 1,
                pageSize: 1,
            })
        )[0] as any;

        if (!initiative) {
            throw new ApiError('Not Found', 404);
        }

        const competences = this.entityDatabaseToEntity(await this.repository.listCompetences(filters)) as any[];

        const initiativeWithCompetences = {
            ...initiative,
            competences: competences.filter((competence) => competence?.initiative?.id === initiative.id),
        };

        return initiativeWithCompetences;
    }

    listCount = async (
        filters?: IConditionInput,
    ): Promise<{ qt: number; qt_pending: number; qt_accepted: number; qt_denied: number } | null> => {
        return await this.repository.listCount(filters);
    };
}
