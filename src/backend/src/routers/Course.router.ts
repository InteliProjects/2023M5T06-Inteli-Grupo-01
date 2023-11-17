import AbstractRouter from './Router';
import CourseController from '../controllers/course/Course.controller';
import CourseService from '../services/course/Course.service';
import CourseRepository from '../repositories/course/Course.repository';
import IMysqlConnection from '../connections/mysql/IMysql.connection';
import ModuleService from '../services/module/Module.service';
import ModuleRepository from '../repositories/module/Module.repository';
import { courseCreateValidator } from '../validators/course/course.create.validator';
import { courseEditValidator } from '../validators/course/course.edit.validator';

export default class CouseRouter extends AbstractRouter {
    private courseController: CourseController;

    constructor(databaseConnection: IMysqlConnection) {
        super();
        this.courseController = new CourseController(
            new CourseService(new CourseRepository(databaseConnection)),
            new ModuleService(new ModuleRepository(databaseConnection)),
        );

        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/', this.courseController.list);
        this.router.post('/', courseCreateValidator, this.courseController.create);
        this.router.get('/:id', this.courseController.findById);
        this.router.patch('/:id', courseEditValidator, this.courseController.updateById);
        this.router.delete('/:id', this.courseController.deleteById);
    }
}
