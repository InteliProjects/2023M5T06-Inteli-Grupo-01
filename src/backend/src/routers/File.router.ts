import AbstractRouter from './Router';
import FileController from '../controllers/file/File.controller';
import FileService from '../services/file/File.service';
import FileRepository from '../repositories/file/File.repository';
import IMysqlConnection from '../connections/mysql/IMysql.connection';

export default class FileRouter extends AbstractRouter {
    private fileController: FileController;

    constructor(databaseConnection: IMysqlConnection) {
        super();
        this.fileController = new FileController(new FileService(new FileRepository(databaseConnection)));
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/', this.fileController.list);
        this.router.post('/', this.fileController.create);
        this.router.get('/:id', this.fileController.findById);
        this.router.patch('/:id', this.fileController.updateById);
        this.router.delete('/:id', this.fileController.deleteById);
    }
}
