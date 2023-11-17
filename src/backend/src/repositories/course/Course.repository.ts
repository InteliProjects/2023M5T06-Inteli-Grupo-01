import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import { ICourseDatabase, ICourseDatabaseCreate, ICourseDatabaseUpdate } from '../../dto/database/ICourse.database.dto';
import Repository from '../Repository';

export default class CourseRepository extends Repository<
    ICourseDatabase,
    ICourseDatabaseCreate,
    ICourseDatabaseUpdate
> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_course', databaseConnection);
    }

    getCompanyTypesAndSectorCounts = async () => {
        return this.databaseConnection.doSelect(`
            SELECT
                COUNT(omp_project.id) as qt,
                omp_company.sector as name,
                'sector' as column_type,
                omp_module.course_id as course_id
            FROM omp_project
                INNER JOIN omp_company ON omp_company.id = omp_project.company_id
                INNER JOIN omp_module ON omp_module.id = omp_project.module_id
            GROUP BY omp_company.sector, omp_module.course_id
            UNION ALL
            SELECT
                COUNT(omp_project.id) as qt,
                omp_company.branch as name,
                'branch' as column_type,
                omp_module.course_id as course_id
            FROM omp_project
                INNER JOIN omp_company ON omp_company.id = omp_project.company_id
                INNER JOIN omp_module ON omp_module.id = omp_project.module_id
            GROUP BY omp_company.branch, omp_module.course_id
            UNION ALL
            SELECT
                COUNT(omp_project.id) as qt,
                omp_company.activity as name,
                'activity' as column_type,
                omp_module.course_id as course_id
            FROM omp_project
                INNER JOIN omp_company ON omp_company.id = omp_project.company_id
                INNER JOIN omp_module ON omp_module.id = omp_project.module_id
            GROUP BY omp_company.activity, omp_module.course_id
            UNION ALL
            SELECT
                COUNT(omp_project.id) as qt,
                omp_company.size as name,
                'size' as column_type,
                omp_module.course_id as course_id
            FROM omp_project
                INNER JOIN omp_company ON omp_company.id = omp_project.company_id
                INNER JOIN omp_module ON omp_module.id = omp_project.module_id
            GROUP BY omp_company.size, omp_module.course_id
        `);
    };
}
