import AbstractRouter from './Router';
import ModuleController from '../controllers/module/Module.controller';
import ModuleService from '../services/module/Module.service';
import ModuleRepository from '../repositories/module/Module.repository';
import IMysqlConnection from '../connections/mysql/IMysql.connection';
import { moduleCreateValidator } from '../validators/module/module.create.validator';
import { moduleEditValidator } from '../validators/module/module.edit.validator';
import ModuleCompetenceService from '../services/module/ModuleCompetence.service';
import ModuleCompetenceRepository from '../repositories/module/ModuleCompetence.repository';
import { moduleCompetenceCreateValidator } from '../validators/module/moduleCompetence.create.validator';

export default class ModuleRouter extends AbstractRouter {
    private moduleController: ModuleController;

    constructor(databaseConnection: IMysqlConnection) {
        super();
        this.moduleController = new ModuleController(
            new ModuleService(new ModuleRepository(databaseConnection)),
            new ModuleCompetenceService(new ModuleCompetenceRepository(databaseConnection)),
        );
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/', this.moduleController.list);
        this.router.post('/', moduleCreateValidator, this.moduleController.create);
        this.router.get('/:id', this.moduleController.findById);
        this.router.patch('/:id', moduleEditValidator, this.moduleController.updateById);
        this.router.delete('/:id', this.moduleController.deleteById);

        this.router.post(
            '/:id/competences',
            moduleCompetenceCreateValidator,
            this.moduleController.createCompetenceRelation,
        );
        this.router.delete('/:moduleId/competences/:competenceId', this.moduleController.deleteCompetenceRelation);
    }
}
