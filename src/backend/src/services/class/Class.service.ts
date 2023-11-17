import {
    IConditionInput,
    IOrders,
    IPagination,
} from '../../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import { IClassEntity, IClassEntityCreate, IClassEntityUpdate } from '../../dto/entities/IClass.entity.dto';
import { ICourseEntity } from '../../dto/entities/ICourse.entity.dto';
import ClassRepository from '../../repositories/class/Class.repository';
import Service from '../Service';

export default class ClassService extends Service<
    IClassEntity,
    IClassEntityCreate,
    IClassEntityUpdate,
    ClassRepository
> {
    async listWithCourse(
        filters?: IConditionInput,
        orders?: IOrders,
        pagination?: IPagination,
    ): Promise<(IClassEntity & { course: ICourseEntity })[]> {
        return this.entityDatabaseToEntity(await this.repository.listWithCourse(filters, orders, pagination));
    }

    async listWithCourseAndModule(
        filters?: IConditionInput,
        orders?: IOrders,
        pagination?: IPagination,
    ): Promise<any[]> {
        return this.entityDatabaseToEntity(await this.repository.listWithCourseAndModule(filters, orders, pagination));
    }

    async listCountWithCourseAndModule(filters?: IConditionInput | undefined): Promise<{ qt: number } | null> {
        return this.entityDatabaseToEntity(await this.repository.listCountWithCourseAndModule(filters));
    }
}
