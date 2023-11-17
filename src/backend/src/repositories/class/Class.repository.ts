import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import {
    IConditionInput,
    IOrders,
    IPagination,
} from '../../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import { IClassDatabase, IClassDatabaseCreate, IClassDatabaseUpdate } from '../../dto/database/IClass.database.dto';
import Repository from '../Repository';

export default class ClassRepository extends Repository<IClassDatabase, IClassDatabaseCreate, IClassDatabaseUpdate> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_class', databaseConnection);
    }

    async listWithCourseAndModule(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination) {
        return this.databaseConnection.doSelect(`
            SELECT 
                ${this.tableName}.*,
                omp_course.name as course_name,
                omp_course.order as course_order,
                omp_module.name as current_module_name,
                omp_module.order as current_module_order
            FROM ${this.tableName}
                INNER JOIN omp_course ON ${this.tableName}.course_id = omp_course.id
                INNER JOIN omp_module ON ${this.tableName}.current_module_id = omp_module.id
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
            ${orders ? `ORDER BY ${this.queryBuilder.normalizeOrders(orders)}` : ''}
            ${pagination ? this.queryBuilder.normalizePagination(pagination) : ''}
        `);
    }

    listCountWithCourseAndModule(filters?: IConditionInput | undefined): Promise<{ qt: number } | null> {
        return this.databaseConnection.doSelectOne(`
            SELECT 
                COUNT(${this.tableName}.id) as qt
            FROM ${this.tableName}
                INNER JOIN omp_course ON ${this.tableName}.course_id = omp_course.id
                INNER JOIN omp_module ON ${this.tableName}.current_module_id = omp_module.id
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
        `);
    }

    async listWithCourse(
        filters?: IConditionInput,
        orders?: IOrders,
        pagination?: IPagination,
    ): Promise<(IClassDatabase & { course_name: string })[]> {
        return this.databaseConnection.doSelect(`
            SELECT 
                ${this.tableName}.*,
                omp_course.name as course_name
            FROM ${this.tableName}
                INNER JOIN omp_course ON ${this.tableName}.course_id = omp_course.id
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
            ${orders ? `ORDER BY ${this.queryBuilder.normalizeOrders(orders)}` : ''}
            ${pagination ? this.queryBuilder.normalizePagination(pagination) : ''}
        `);
    }
}
