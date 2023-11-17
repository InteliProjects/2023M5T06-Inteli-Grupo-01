import AbstractRouter from './Router';
import CompetenceController from '../controllers/competence/Competence.controller';
import CompetenceService from '../services/competence/Competence.service';
import CompetenceRepository from '../repositories/competence/Competence.repository';
import IMysqlConnection from '../connections/mysql/IMysql.connection';
import { competenceCreateValidator } from '../validators/competence/competence.create.validator';
import { competenceEditValidator } from '../validators/competence/competence.edit.validator';

export default class CompetenceRouter extends AbstractRouter {
    private competenceController: CompetenceController;

    constructor(databaseConnection: IMysqlConnection) {
        super();
        this.competenceController = new CompetenceController(
            new CompetenceService(new CompetenceRepository(databaseConnection)),
        );
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/', this.competenceController.list);
        this.router.post('/', competenceCreateValidator, this.competenceController.create);
        this.router.get('/:id', this.competenceController.findById);
        this.router.patch('/:id', competenceEditValidator, this.competenceController.updateById);
        this.router.delete('/:id', this.competenceController.deleteById);
    }
}
