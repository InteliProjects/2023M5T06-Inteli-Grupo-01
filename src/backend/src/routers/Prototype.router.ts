import AbstractRouter from './Router';
import PrototypeController from '../controllers/prototype/Prototype.controller';
import PrototypeService from '../services/prototype/Prototype.service';
import PrototypeRepository from '../repositories/prototype/Prototype.repository';
import IMysqlConnection from '../connections/mysql/IMysql.connection';
import { prototypeCreateValidator } from '../validators/prototype/prototype.create.validator';
import { prototypeEditValidator } from '../validators/prototype/prototype.edit.validator';

export default class PrototypeRouter extends AbstractRouter {
    private prototypeController: PrototypeController;

    constructor(databaseConnection: IMysqlConnection) {
        super();
        this.prototypeController = new PrototypeController(
            new PrototypeService(new PrototypeRepository(databaseConnection)),
        );
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/', this.prototypeController.list);
        this.router.post('/', prototypeCreateValidator, this.prototypeController.create);
        this.router.get('/:id', this.prototypeController.findById);
        this.router.patch('/:id', prototypeEditValidator, this.prototypeController.updateById);
        this.router.delete('/:id', this.prototypeController.deleteById);
    }
}
