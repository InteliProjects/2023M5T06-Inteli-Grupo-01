import IMysqlConnection from '../connections/mysql/IMysql.connection';
import IMysqlQueryBuilder, {
    ICondition,
    IConditionInput,
    IOrders,
    IPagination,
} from '../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import MysqlQueryBuilder from '../connections/mysql/queryBuilder/MysqlQueryBuilder.connection';
import IRepository from './IRepository';
export default abstract class Repository<IEntityDatabase, IEntityDatabaseCreate, IEntityDatabaseUpdate>
    implements IRepository<IEntityDatabase, IEntityDatabaseCreate, IEntityDatabaseUpdate>
{
    protected tableName: string;
    protected databaseConnection: IMysqlConnection;
    protected queryBuilder: IMysqlQueryBuilder;
    protected identifierColumns: string[];

    constructor(tableName: string, databaseConnection: IMysqlConnection, identifierColumns: string[] = ['id']) {
        this.tableName = tableName;
        this.databaseConnection = databaseConnection;
        this.queryBuilder = new MysqlQueryBuilder(this.tableName);
        this.identifierColumns = identifierColumns;
    }

    async findById(id: string | number): Promise<IEntityDatabase | null> {
        return this.find(this.getIdentifierColumnsCondition(id));
    }

    async updateById(id: string | number, data: IEntityDatabaseUpdate): Promise<number> {
        return this.update(this.getIdentifierColumnsCondition(id), data);
    }

    async deleteById(id: string | number): Promise<number> {
        return this.delete(this.getIdentifierColumnsCondition(id));
    }

    async list(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination): Promise<IEntityDatabase[]> {
        return this.databaseConnection.doSelect<IEntityDatabase>(`
            SELECT *
            FROM ${this.tableName}
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
            ${orders ? `ORDER BY ${this.queryBuilder.normalizeOrders(orders)}` : ''}
            ${pagination ? this.queryBuilder.normalizePagination(pagination) : ''}
        `);
    }

    async listCount(filters?: IConditionInput): Promise<{ qt: number } | null> {
        const result = await this.databaseConnection.doSelectOne<{ qt: number }>(`
            SELECT COUNT(${this.tableName}.id) as qt
            FROM ${this.tableName}
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
        `);

        return result;
    }

    async find(filters: IConditionInput): Promise<IEntityDatabase | null> {
        return this.databaseConnection.doSelectOne<IEntityDatabase>(`
            SELECT *
            FROM ${this.tableName}
            WHERE ${this.queryBuilder.normalizeFilters(filters)}
            LIMIT 1
        `);
    }

    async create(data: IEntityDatabaseCreate): Promise<number> {
        return this.databaseConnection.doCreate(`
            INSERT INTO ${this.tableName}
            (${Object.keys(data as {})
                .map((value) => this.queryBuilder.escapeId(value))
                .join(', ')})
            VALUES
            (${Object.values(data as {})
                .map((value) => this.queryBuilder.escape(value))
                .join(', ')})
        `);
    }

    async update(filters: IConditionInput, data: IEntityDatabaseUpdate): Promise<number> {
        return this.databaseConnection.doCreate(`
            UPDATE ${this.tableName}
            SET ${Object.entries(data as {})
                .map((entrie) => `${this.queryBuilder.escapeId(entrie[0])} = ${this.queryBuilder.escape(entrie[1])}`)
                .join(', ')}
            WHERE
                ${this.queryBuilder.normalizeFilters(filters)}
        `);
    }

    async delete(filters: IConditionInput): Promise<number> {
        return this.databaseConnection.doDelete(`
            DELETE FROM ${this.tableName}
            WHERE ${this.queryBuilder.normalizeFilters(filters)}
        `);
    }

    protected getIdentifierColumnsCondition(value: string | number | null): ICondition | IConditionInput {
        if (this.identifierColumns.length == 1) {
            return { field: this.identifierColumns[0], value: value };
        } else {
            return {
                $AND: this.identifierColumns.map((identifierColumn) => {
                    return { field: identifierColumn, value: value };
                }),
            };
        }
    }
}
