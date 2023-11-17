import { IConditionInput, IOrders, IPagination } from '../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import ApiError from '../infra/config/apiError/ApiError.config';
import IRepository from '../repositories/IRepository';
import camelKeysToSnake from '../utils/camelKeysToSnake/camelKeysToSnake.util';
import snakeKeysToCamel from '../utils/snakeKeysToCamel/snakeKeysToCamel.util';
import { transformDatabaseToEntity } from '../utils/transformDatabaseToEntity/transformDatabaseToEntity.util';
import IService from './IService';
export default abstract class Service<
    IEntity,
    IEntityCreate,
    IEntityUpdate,
    IServiceRepository extends IRepository<any, any, any> = IRepository<any, any, any>,
> implements IService<IEntity, IEntityCreate, IEntityUpdate, IServiceRepository>
{
    protected repository: IServiceRepository;
    constructor(repository: IServiceRepository) {
        this.repository = repository;
    }

    async createAndFind(data: IEntityCreate): Promise<IEntity> {
        const createdId = await this.create(data);
        return this.findById(createdId) as IEntity;
    }

    async updateByIdAndFind(id: number | string, data: IEntityUpdate): Promise<IEntity | null> {
        await this.updateById(id, data);
        return this.findById(id);
    }

    async findById(id: string | number): Promise<IEntity | null> {
        return this.find({ field: 'id', value: id });
    }

    async updateById(id: string | number, data: IEntityUpdate): Promise<number> {
        return this.update({ field: 'id', value: id }, data);
    }

    async deleteById(id: string | number): Promise<number> {
        return this.delete({ field: 'id', value: id });
    }

    async list(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination): Promise<IEntity[]> {
        return this.entityDatabaseToEntity(await this.repository.list(filters, orders, pagination));
    }

    async listCount(filters?: IConditionInput): Promise<{ qt: number } | null> {
        return await this.repository.listCount(filters);
    }

    async find(filters: IConditionInput): Promise<IEntity | null> {
        const entityDatabase = await this.repository.find(filters);

        if (!entityDatabase) {
            throw new ApiError('Not found', 404);
        }

        return this.entityDatabaseToEntity(entityDatabase);
    }

    async create(data: IEntityCreate): Promise<number> {
        return this.repository.create(this.entityToEntityDatabase(data));
    }

    async update(filters: IConditionInput, data: IEntityUpdate): Promise<number> {
        return this.repository.update(filters, this.entityToEntityDatabase(data));
    }

    async delete(filters: IConditionInput): Promise<number> {
        return this.repository.delete(filters);
    }

    protected entityToEntityDatabase<T = IEntity>(entity: T): any {
        return camelKeysToSnake(entity);
    }

    protected entityDatabaseToEntity<R = any>(entityDatabase: any): R {
        return snakeKeysToCamel(transformDatabaseToEntity(entityDatabase));
    }
}
