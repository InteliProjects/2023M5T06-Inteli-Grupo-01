import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import {
    IConditionInput,
    IOrders,
    IPagination,
} from '../../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import { IModuleDatabase, IModuleDatabaseCreate, IModuleDatabaseUpdate } from '../../dto/database/IModule.database.dto';
import Repository from '../Repository';

export default class ModuleRepository extends Repository<
    IModuleDatabase,
    IModuleDatabaseCreate,
    IModuleDatabaseUpdate
> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_module', databaseConnection);
    }

    listWithCourse(filters?: IConditionInput, orders?: IOrders, pagionation?: IPagination) {
        return this.databaseConnection.doSelect(`
            SELECT ${this.tableName}.*,
                omp_course.name as course_name,
                omp_course.observation as course_observation,
                omp_course.order as course_order,
                omp_course.created_at as course_created_at,
                omp_course.updated_at as course_updated_at
            FROM ${this.tableName}
                INNER JOIN omp_course ON omp_course.id = ${this.tableName}.course_id
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
            ${orders ? `ORDER BY ${this.queryBuilder.normalizeOrders(orders)}` : ''}
            ${pagionation ? this.queryBuilder.normalizePagination(pagionation) : ''}
        `);
    }

    listCountWithCourse(filters?: IConditionInput): Promise<{ qt: number } | null> {
        return this.databaseConnection.doSelectOne(`
            SELECT COUNT(${this.tableName}.id) as qt
            FROM ${this.tableName}
                INNER JOIN omp_course ON omp_course.id = ${this.tableName}.course_id
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
        `);
    }

    async listCompetences(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination) {
        return await this.databaseConnection.doSelect(`
            SELECT 
                ${this.tableName}.id as module_id,
                omp_competence.id,
                omp_competence.name,
                omp_competence.description,
                omp_module_competence.created_at
            FROM ${this.tableName}
                INNER JOIN omp_module_competence ON omp_module_competence.module_id = ${this.tableName}.id
                INNER JOIN omp_competence ON omp_competence.id = omp_module_competence.competence_id 
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
            ${orders ? `ORDER BY ${this.queryBuilder.normalizeOrders(orders)}` : ''}
            ${pagination ? this.queryBuilder.normalizePagination(pagination) : ''}
        `);
    }
}
