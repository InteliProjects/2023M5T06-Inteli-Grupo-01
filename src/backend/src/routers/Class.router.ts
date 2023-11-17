import AbstractRouter from './Router';
import ClassController from '../controllers/class/Class.controller';
import ClassService from '../services/class/Class.service';
import ClassRepository from '../repositories/class/Class.repository';
import IMysqlConnection from '../connections/mysql/IMysql.connection';
import ModuleService from '../services/module/Module.service';
import ModuleRepository from '../repositories/module/Module.repository';
import ProjectService from '../services/project/Project.service';
import ProjectRepository from '../repositories/project/Project.repository';
import InitiativeService from '../services/initiative/Initiative.service';
import InitiativeRepository from '../repositories/initiative/Initiative.repository';
import { classCreateValidator } from '../validators/class/class.create.validator';
import { classEditValidator } from '../validators/class/class.edit.validator';

export default class ClassRouter extends AbstractRouter {
    private classController: ClassController;

    constructor(databaseConnection: IMysqlConnection) {
        super();
        this.classController = new ClassController(
            new ClassService(new ClassRepository(databaseConnection)),
            new ModuleService(new ModuleRepository(databaseConnection)),
            new InitiativeService(new InitiativeRepository(databaseConnection)),
            new ProjectService(new ProjectRepository(databaseConnection)),
        );

        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/', this.classController.list);
        this.router.post('/', classCreateValidator, this.classController.create);
        this.router.get('/:id', this.classController.findById);
        this.router.patch('/:id', classEditValidator, this.classController.updateById);
        this.router.delete('/:id', this.classController.deleteById);
    }
}
