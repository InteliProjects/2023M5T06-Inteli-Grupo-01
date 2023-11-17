import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import {
    ITeacherDatabase,
    ITeacherDatabaseCreate,
    ITeacherDatabaseUpdate,
} from '../../dto/database/ITeacher.database.dto';
import Repository from '../Repository';

export default class TeacherRepository extends Repository<
    ITeacherDatabase,
    ITeacherDatabaseCreate,
    ITeacherDatabaseUpdate
> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_teacher', databaseConnection);
    }
}
