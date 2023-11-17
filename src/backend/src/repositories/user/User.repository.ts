import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import { IUserDatabase, IUserDatabaseCreate, IUserDatabaseUpdate } from '../../dto/database/IUser.database.dto';
import Repository from '../Repository';

export default class UserRepository extends Repository<IUserDatabase, IUserDatabaseCreate, IUserDatabaseUpdate> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_user', databaseConnection);
    }
}
