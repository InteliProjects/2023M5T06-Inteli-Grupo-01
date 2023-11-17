import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import {
    IConditionInput,
    IOrders,
    IPagination,
} from '../../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import {
    IProjectDatabase,
    IProjectDatabaseCreate,
    IProjectDatabaseUpdate,
} from '../../dto/database/IProject.database.dto';
import Repository from '../Repository';

export default class ProjectRepository extends Repository<
    IProjectDatabase,
    IProjectDatabaseCreate,
    IProjectDatabaseUpdate
> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_project', databaseConnection);
    }

    async listWithModuleCompanyAndClass(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination) {
        return this.databaseConnection.doSelect(`
            SELECT 
                ${this.tableName}.*,
                omp_company.name as company_name,
                omp_company.sector as company_sector,
                omp_company.branch as company_branch,
                omp_company.activity as company_activity,
                omp_company.size as company_size,
                omp_company.email as company_email,
                omp_module.name as module_name,
                omp_module.order as module_order,
                omp_course.id as module_course_id,
                omp_course.name as module_course_name,
                omp_course.order as module_course_order,
                omp_class.name AS class_name,
                omp_class.status AS class_status,
                omp_class.student_quantity AS class_student_quantity
            FROM ${this.tableName}
                INNER JOIN omp_company ON omp_company.id = ${this.tableName}.company_id
                INNER JOIN omp_module ON omp_module.id = ${this.tableName}.module_id
                INNER JOIN omp_course ON omp_course.id = omp_module.course_id
                INNER JOIN omp_class ON omp_class.id = ${this.tableName}.class_id
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
            ${orders ? `ORDER BY ${this.queryBuilder.normalizeOrders(orders)}` : ''}
            ${pagination ? this.queryBuilder.normalizePagination(pagination) : ''}
        `);
    }

    async listCountWithModuleCompanyAndClass(filters?: IConditionInput | undefined): Promise<{ qt: number } | null> {
        return this.databaseConnection.doSelectOne(`
            SELECT COUNT(${this.tableName}.id) as qt
            FROM ${this.tableName}
                INNER JOIN omp_company ON omp_company.id = ${this.tableName}.company_id
                INNER JOIN omp_module ON omp_module.id = ${this.tableName}.module_id
                INNER JOIN omp_course ON omp_course.id = omp_module.course_id
                INNER JOIN omp_class ON omp_class.id = ${this.tableName}.class_id
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
        `);
    }

    listWithCompany = async (): Promise<(IProjectDatabase & { company_name: string })[]> => {
        return this.databaseConnection.doSelect(`
            SELECT 
                ${this.tableName}.*,
                omp_company.name as company_name
            FROM ${this.tableName}
                INNER JOIN omp_company ON ${this.tableName}.company_id = omp_company.id
            
        `);
    };

    async listCompetences(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination) {
        return await this.databaseConnection.doSelect(`
            SELECT
                ${this.tableName}.id as project_id,
                omp_competence.id,
                omp_competence.name,
                omp_competence.description,
                omp_project_competence.value,
                omp_project_competence.created_at
            FROM ${this.tableName}
                INNER JOIN omp_project_competence ON omp_project_competence.project_id = ${this.tableName}.id
                INNER JOIN omp_competence ON omp_competence.id = omp_project_competence.competence_id 
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
            ${orders ? `ORDER BY ${this.queryBuilder.normalizeOrders(orders)}` : ''}
            ${pagination ? this.queryBuilder.normalizePagination(pagination) : ''}
        `);
    }

    async listTeachers(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination) {
        return await this.databaseConnection.doSelect(`
            SELECT
                ${this.tableName}.id as project_id,
                omp_teacher.id,
                omp_teacher.name,
                omp_teacher.observation,
                omp_project_teacher.role,
                omp_project_teacher.created_at
            FROM ${this.tableName}
                INNER JOIN omp_project_teacher ON omp_project_teacher.project_id = ${this.tableName}.id
                INNER JOIN omp_teacher ON omp_teacher.id = omp_project_teacher.teacher_id 
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
            ${orders ? `ORDER BY ${this.queryBuilder.normalizeOrders(orders)}` : ''}
            ${pagination ? this.queryBuilder.normalizePagination(pagination) : ''}
        `);
    }
}
