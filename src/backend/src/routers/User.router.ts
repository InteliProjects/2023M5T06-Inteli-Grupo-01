import AbstractRouter from './Router';
import UserController from '../controllers/user/User.controller';
import UserService from '../services/user/User.service';
import UserRepository from '../repositories/user/User.repository';
import IMysqlConnection from '../connections/mysql/IMysql.connection';
import { userCreateValidator } from '../validators/user/user.create.validator';
import { userEditValidator } from '../validators/user/user.edit.validator';

export default class UserRouter extends AbstractRouter {
    private userController: UserController;

    constructor(databaseConnection: IMysqlConnection) {
        super();
        this.userController = new UserController(new UserService(new UserRepository(databaseConnection)));
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/', this.userController.list);
        this.router.post('/', userCreateValidator, this.userController.create);
        this.router.get('/:id', this.userController.findById);
        this.router.patch('/:id', userEditValidator, this.userController.updateById);
        this.router.delete('/:id', this.userController.deleteById);
    }
}
