import AbstractRouter from './Router';
import ProjectController from '../controllers/project/Project.controller';
import ProjectService from '../services/project/Project.service';
import ProjectRepository from '../repositories/project/Project.repository';
import IMysqlConnection from '../connections/mysql/IMysql.connection';
import { projectCreateValidator } from '../validators/project/project.create.validator';
import { projectEditValidator } from '../validators/project/project.edit.validator';
import ProjectCompetenceService from '../services/project/ProjectCompetence.service';
import ProjectCompetenceRepository from '../repositories/project/ProjectCompetence.repository';
import ProjectTeacherService from '../services/project/ProjectTeacher.service';
import ProjectTeacherRepository from '../repositories/project/ProjectTeacher.repository';
import { projectCompetenceCreateValidator } from '../validators/project/projectCompetence.create.validator';
import { projectTeacherCreateValidator } from '../validators/project/projectTeacher.create.validator';

export default class ProjectRouter extends AbstractRouter {
    private projectController: ProjectController;

    constructor(databaseConnection: IMysqlConnection) {
        super();
        this.projectController = new ProjectController(
            new ProjectService(new ProjectRepository(databaseConnection)),
            new ProjectCompetenceService(new ProjectCompetenceRepository(databaseConnection)),
            new ProjectTeacherService(new ProjectTeacherRepository(databaseConnection)),
        );
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/', this.projectController.list);
        this.router.post('/', projectCreateValidator, this.projectController.create);
        this.router.get('/:id', this.projectController.findById);
        this.router.patch('/:id', projectEditValidator, this.projectController.updateById);
        this.router.delete('/:id', this.projectController.deleteById);

        this.router.post(
            '/:id/competences',
            projectCompetenceCreateValidator,
            this.projectController.createCompetenceRelation,
        );
        this.router.delete('/:projectId/competences/:competenceId', this.projectController.deleteCompetenceRelation);

        this.router.post('/:id/teachers', projectTeacherCreateValidator, this.projectController.createTeacherRelation);
        this.router.delete('/:projectId/teachers/:teacherId', this.projectController.deleteTeacherRelation);
    }
}
