import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import {
    IConditionInput,
    IOrders,
    IPagination,
} from '../../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import {
    IInitiativeDatabase,
    IInitiativeDatabaseCreate,
    IInitiativeDatabaseUpdate,
} from '../../dto/database/IInitiative.database.dto';
import Repository from '../Repository';

export default class InitiativeRepository extends Repository<
    IInitiativeDatabase,
    IInitiativeDatabaseCreate,
    IInitiativeDatabaseUpdate
> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_initiative', databaseConnection);
    }

    listCount = async (filters?: IConditionInput) => {
        return await this.databaseConnection.doSelectOne(`
            SELECT
                (COUNT(*)) as qt,
                (SUM(CASE WHEN ${this.queryBuilder.escapeId('status')} = 'PENDING' THEN 1 ELSE 0 END)) as qt_pending,
                (SUM(CASE WHEN ${this.queryBuilder.escapeId('status')} = 'ACCEPTED' THEN 1 ELSE 0 END)) as qt_accepted,
                (SUM(CASE WHEN ${this.queryBuilder.escapeId('status')} = 'DENIED' THEN 1 ELSE 0 END)) as qt_denied
            FROM ${this.tableName}
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
        `);
    };

    listWithModuleAndCompany = async (filters?: IConditionInput, orders?: IOrders, pagination?: IPagination) => {
        let rankOrder = null;
        if (orders?.find((order) => order.field == 'rank')) {
            rankOrder = ` (
                SELECT SUM(ic.value) / COUNT(ic.competence_id) 
                FROM omp_initiative_competence ic
                    INNER JOIN omp_initiative i ON ic.initiative_id = i.id
                WHERE i.id = omp_initiative.id
            ) ${orders?.find((order) => order.field == 'rank')?.order}`;

            orders = orders.filter((order) => order.field != 'rank');
        }

        return await this.databaseConnection.doSelect(`
            SELECT ${this.tableName}.*,
                (
                    SELECT SUM(ic.value) / COUNT(ic.competence_id) 
                    FROM omp_initiative_competence ic
                        INNER JOIN omp_initiative i ON ic.initiative_id = i.id
                    WHERE i.id = omp_initiative.id
                ) AS ${this.queryBuilder.escapeId(`rank`)},
                omp_company.name AS company_name,
                omp_company.sector AS company_sector,
                omp_company.branch AS company_branch,
                omp_company.activity AS company_activity,
                omp_company.size AS company_size,
                omp_company.email AS company_email,
                omp_company.avatar_file_id AS company_avatar_file_id,
                omp_module.name AS module_name,
                omp_module.description AS module_description,
                omp_module.order AS module_order,
                omp_module.course_id as module_course_id,
                omp_course.name AS module_course_name,
                omp_course.order AS module_course_order
            FROM ${this.tableName}
                INNER JOIN omp_company ON omp_company.id = ${this.tableName}.company_id
                INNER JOIN omp_module ON omp_module.id = ${this.tableName}.module_id
                INNER JOIN omp_course ON omp_course.id = omp_module.course_id
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
            ${orders ? `ORDER BY ${this.queryBuilder.normalizeOrders(orders)}` : ''}
            ${pagination ? this.queryBuilder.normalizePagination(pagination) : ''}
        `);
    };

    listCountWithModuleAndCompany = async (filters?: IConditionInput) => {
        return await this.databaseConnection.doSelectOne(`
            SELECT
                (COUNT(*)) as qt,
                (SUM(CASE WHEN ${this.queryBuilder.escapeId('status')} = 'PENDING' THEN 1 ELSE 0 END)) as qt_pending,
                (SUM(CASE WHEN ${this.queryBuilder.escapeId('status')} = 'ACCEPTED' THEN 1 ELSE 0 END)) as qt_accepted,
                (SUM(CASE WHEN ${this.queryBuilder.escapeId('status')} = 'DENIED' THEN 1 ELSE 0 END)) as qt_denied
            FROM ${this.tableName}
                INNER JOIN omp_company ON omp_company.id = ${this.tableName}.company_id
                INNER JOIN omp_module ON omp_module.id = ${this.tableName}.module_id
                INNER JOIN omp_course ON omp_course.id = omp_module.course_id
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
        `);
    };

    async listCompetences(filters?: IConditionInput, orders?: IOrders, pagination?: IPagination) {
        return await this.databaseConnection.doSelect(`
            SELECT 
                ${this.tableName}.id as initiative_id,
                omp_competence.id,
                omp_competence.name,
                omp_competence.description,
                omp_initiative_competence.value,
                omp_initiative_competence.created_at
            FROM ${this.tableName}
                INNER JOIN omp_initiative_competence ON omp_initiative_competence.initiative_id = ${this.tableName}.id
                INNER JOIN omp_competence ON omp_competence.id = omp_initiative_competence.competence_id 
            ${filters ? `WHERE ${this.queryBuilder.normalizeFilters(filters)}` : ''}
            ${orders ? `ORDER BY ${this.queryBuilder.normalizeOrders(orders)}` : ''}
            ${pagination ? this.queryBuilder.normalizePagination(pagination) : ''}
        `);
    }
}
