import { IConditionInput, IOrders, IPagination } from '../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';

export default interface IRepository<IEntityDatabase, IEntityDatabaseCreate, IEntityDatabaseUpdate> {
    findById(id: string | number): Promise<IEntityDatabase | null>;
    updateById(id: string | number, data: IEntityDatabaseUpdate): Promise<number>;
    deleteById(id: string | number): Promise<number>;
    list(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination): Promise<IEntityDatabase[]>;
    listCount(filters?: IConditionInput): Promise<{ qt: number } | null>;
    find(filters: IConditionInput): Promise<IEntityDatabase | null>;
    create(data: IEntityDatabaseCreate): Promise<number>;
    update(filters: IConditionInput, data: IEntityDatabaseUpdate): Promise<number>;
    delete(filters: IConditionInput): Promise<number>;
}
