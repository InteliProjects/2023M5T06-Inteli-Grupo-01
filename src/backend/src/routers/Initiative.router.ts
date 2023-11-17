import AbstractRouter from './Router';
import InitiativeController from '../controllers/initiative/Initiative.controller';
import InitiativeService from '../services/initiative/Initiative.service';
import InitiativeRepository from '../repositories/initiative/Initiative.repository';
import IMysqlConnection from '../connections/mysql/IMysql.connection';
import { initiativeCreateValidator } from '../validators/initiative/initiative.create.validator';
import { initiativeEditValidator } from '../validators/initiative/initiative.edit.validator';
import InitiativeCompetenceService from '../services/initiative/InitiativeCompetence.service';
import InitiativeCompetenceRepository from '../repositories/initiative/InitiativeCompetence.repository';
import { initiativeCompetenceCreateValidator } from '../validators/initiative/initiativeCompetence.create.validator';

export default class InitiativeRouter extends AbstractRouter {
    private initiativeController: InitiativeController;

    constructor(databaseConnection: IMysqlConnection) {
        super();
        this.initiativeController = new InitiativeController(
            new InitiativeService(new InitiativeRepository(databaseConnection)),
            new InitiativeCompetenceService(new InitiativeCompetenceRepository(databaseConnection)),
        );
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/', this.initiativeController.list);
        this.router.post('/', initiativeCreateValidator, this.initiativeController.create);
        this.router.get('/:id', this.initiativeController.findById);
        this.router.patch('/:id', initiativeEditValidator, this.initiativeController.updateById);
        this.router.delete('/:id', this.initiativeController.deleteById);

        this.router.post(
            '/:id/competences',
            initiativeCompetenceCreateValidator,
            this.initiativeController.createCompetenceRelation,
        );
        this.router.delete(
            '/:initiativeId/competences/:competenceId',
            this.initiativeController.deleteCompetenceRelation,
        );
    }
}
