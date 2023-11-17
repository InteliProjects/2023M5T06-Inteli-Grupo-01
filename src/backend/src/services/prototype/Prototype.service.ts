import {
    IConditionInput,
    IOrders,
    IPagination,
} from '../../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import {
    IPrototypeEntity,
    IPrototypeEntityCreate,
    IPrototypeEntityUpdate,
} from '../../dto/entities/IPrototype.entity.dto';
import PrototypeRepository from '../../repositories/prototype/Prototype.repository';
import Service from '../Service';

export default class PrototypeService extends Service<
    IPrototypeEntity,
    IPrototypeEntityCreate,
    IPrototypeEntityUpdate,
    PrototypeRepository
> {
    async listWithProjectModuleCourseAndClass(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination) {
        return this.entityDatabaseToEntity(
            await this.repository.listWithProjectModuleCourseAndClass(filters, orders, pagination),
        );
    }

    async listCountWithProjectModuleCourseAndClass(filters?: IConditionInput) {
        return this.entityDatabaseToEntity(
            await this.repository.listCountWithProjectModuleCourseAndClass(filters),
        ) as any;
    }
}
