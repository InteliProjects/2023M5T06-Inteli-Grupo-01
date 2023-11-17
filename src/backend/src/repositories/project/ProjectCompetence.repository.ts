import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import {
    IProjectCompetenceDatabase,
    IProjectCompetenceDatabaseCreate,
    IProjectCompetenceDatabaseUpdate,
} from '../../dto/database/IProjectCompetence.database.dto';
import Repository from '../Repository';

export default class ProjectCompetenceRepository extends Repository<
    IProjectCompetenceDatabase,
    IProjectCompetenceDatabaseCreate,
    IProjectCompetenceDatabaseUpdate
> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_project_competence', databaseConnection, ['project_id', 'competence_id']);
    }
}
