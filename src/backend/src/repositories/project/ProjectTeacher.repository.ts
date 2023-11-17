import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import {
    IProjectTeacherDatabase,
    IProjectTeacherDatabaseCreate,
    IProjectTeacherDatabaseUpdate,
} from '../../dto/database/IProjectTeacher.database.dto';
import Repository from '../Repository';

export default class ProjectTeacherRepository extends Repository<
    IProjectTeacherDatabase,
    IProjectTeacherDatabaseCreate,
    IProjectTeacherDatabaseUpdate
> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_project_teacher', databaseConnection, ['project_id', 'teacher_id']);
    }
}
