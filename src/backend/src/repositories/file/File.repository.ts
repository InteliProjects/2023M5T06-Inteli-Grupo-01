import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import { IFileDatabase, IFileDatabaseCreate, IFileDatabaseUpdate } from '../../dto/database/IFile.database.dto';
import Repository from '../Repository';

export default class FileRepository extends Repository<IFileDatabase, IFileDatabaseCreate, IFileDatabaseUpdate> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_file', databaseConnection);
    }
}
