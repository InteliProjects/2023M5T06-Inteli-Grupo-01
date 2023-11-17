import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import {
    ICompanyDatabase,
    ICompanyDatabaseCreate,
    ICompanyDatabaseUpdate,
} from '../../dto/database/ICompany.database.dto';
import Repository from '../Repository';

export default class CompanyRepository extends Repository<
    ICompanyDatabase,
    ICompanyDatabaseCreate,
    ICompanyDatabaseUpdate
> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_company', databaseConnection);
    }
}
