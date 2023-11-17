import IMysqlConnection from '../../connections/mysql/IMysql.connection';
import {
    IModuleCompetenceDatabase,
    IModuleCompetenceDatabaseCreate,
    IModuleCompetenceDatabaseUpdate,
} from '../../dto/database/IModuleCompetence.database.dto';
import Repository from '../Repository';

export default class ModuleCompetenceRepository extends Repository<
    IModuleCompetenceDatabase,
    IModuleCompetenceDatabaseCreate,
    IModuleCompetenceDatabaseUpdate
> {
    constructor(databaseConnection: IMysqlConnection) {
        super('omp_module_competence', databaseConnection, ['module_id', 'competence_id']);
    }
}
