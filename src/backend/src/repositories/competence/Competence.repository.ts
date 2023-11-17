import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import {
    ICompetenceDatabase,
    ICompetenceDatabaseCreate,
    ICompetenceDatabaseUpdate,
} from '../../dto/database/ICompetence.database.dto';
import Repository from '../Repository';

export default class CompetenceRepository extends Repository<
    ICompetenceDatabase,
    ICompetenceDatabaseCreate,
    ICompetenceDatabaseUpdate
> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_competence', databaseConnection);
    }
}
