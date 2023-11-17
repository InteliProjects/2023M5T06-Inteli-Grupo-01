import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import {
    IConditionInput,
    IOrders,
    IPagination,
} from '../../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import {
    IPrototypeDatabase,
    IPrototypeDatabaseCreate,
    IPrototypeDatabaseUpdate,
} from '../../dto/database/IPrototype.database.dto';
import Repository from '../Repository';

export default class PrototypeRepository extends Repository<
    IPrototypeDatabase,
    IPrototypeDatabaseCreate,
    IPrototypeDatabaseUpdate
> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_prototype', databaseConnection);
    }

    async listCountWithProjectModuleCourseAndClass(
        filters?: IConditionInput | undefined,
    ): Promise<{ qt: number } | null> {
        return this.databaseConnection.doSelectOne(`
            SELECT COUNT(${this.tableName}.id) as qt
            FROM ${this.tableName}
                INNER JOIN omp_project ON ${this.tableName}.project_id = omp_project.id
                INNER JOIN omp_company ON omp_company.id = omp_project.company_id
                INNER JOIN omp_module ON omp_module.id = omp_project.module_id
                INNER JOIN omp_course ON omp_course.id = omp_module.course_id
                INNER JOIN omp_class ON omp_class.id = omp_project.class_id
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
        `);
    }

    async listWithProjectModuleCourseAndClass(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination) {
        return this.databaseConnection.doSelect(`
            SELECT 
                ${this.tableName}.*,
                omp_project.name as project_project_name,
                omp_project.status as project_project_status,
                omp_company.id as project_company_id,
                omp_company.name as project_company_name,
                omp_company.sector as project_company_sector,
                omp_company.branch as project_company_branch,
                omp_company.activity as project_company_activity,
                omp_company.size as project_company_size,
                omp_company.email as project_company_email,
                omp_module.id as project_module_id,
                omp_module.name as project_module_name,
                omp_module.order as project_module_order,
                omp_course.id as project_module_course_id,
                omp_course.name as project_module_course_name,
                omp_course.order as project_module_course_order,
                omp_class.id AS project_class_id,
                omp_class.name AS project_class_name,
                omp_class.status AS project_class_status,
                omp_class.student_quantity AS project_class_student_quantity
            FROM ${this.tableName}
                INNER JOIN omp_project ON ${this.tableName}.project_id = omp_project.id
                INNER JOIN omp_company ON omp_company.id = omp_project.company_id
                INNER JOIN omp_module ON omp_module.id = omp_project.module_id
                INNER JOIN omp_course ON omp_course.id = omp_module.course_id
                INNER JOIN omp_class ON omp_class.id = omp_project.class_id
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
            ${orders ? `ORDER BY ${this.queryBuilder.normalizeOrders(orders)}` : ''}
            ${pagination ? this.queryBuilder.normalizePagination(pagination) : ''}
        `);
    }
}
