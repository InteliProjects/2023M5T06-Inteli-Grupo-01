import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import {
    IInitiativeDatabase,
    IInitiativeDatabaseCreate,
    IInitiativeDatabaseUpdate,
} from '../../dto/database/IInitiative.database.dto';
import Repository from '../Repository';

export default class InitiativeCompetenceRepository extends Repository<
    IInitiativeDatabase,
    IInitiativeDatabaseCreate,
    IInitiativeDatabaseUpdate
> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_initiative_competence', databaseConnection, ['initiative_id', 'competence_id']);
    }
}
