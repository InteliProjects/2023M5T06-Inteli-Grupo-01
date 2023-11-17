import { Request, Response } from 'express';
import IController from '../IController';
import ProjectService from '../../services/project/Project.service';
import Controller from '../Controller';
import ProjectCompetenceService from '../../services/project/ProjectCompetence.service';
import ProjectTeacherService from '../../services/project/ProjectTeacher.service';

export default class ProjectController extends Controller implements IController {
    private projectService: ProjectService;
    private projectCompetenceService: ProjectCompetenceService;
    private projectTeacherService: ProjectTeacherService;

    constructor(
        projectService: ProjectService,
        projectCompetenceService: ProjectCompetenceService,
        projectTeacherService: ProjectTeacherService,
    ) {
        super();

        this.projectService = projectService;
        this.projectCompetenceService = projectCompetenceService;
        this.projectTeacherService = projectTeacherService;
    }

    list = async (req: Request, res: Response) => {
        const configs = this.getFiltersOrdersAndPagination(req, [
            'name',
            { table: 'omp_module', field: 'name' },
            { table: 'omp_company', field: 'name' },
            { table: 'omp_class', field: 'name' },
        ]);

        const listCounts = await this.projectService.listCountWithModuleCompanyAndClass(configs.filters);
        const data = await this.projectService.listWithModuleCompanyClassTeachersAndCompetences(
            configs.filters,
            configs.orders,
            configs.pagination,
        );

        res.json(this.makeListJson(data, listCounts, configs.pagination));
    };

    findById = async (req: Request<{ id: string }>, res: Response) => {
        const result = await this.projectService.findWithModuleCompanyClassTeachersAndCompetences({
            field: 'id',
            value: req.params.id,
        });

        res.json(result);
    };

    create = async (req: Request, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.projectService.createAndFind(body));
    };

    updateById = async (req: Request<{ id: string }>, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.projectService.updateByIdAndFind(req.params.id, body));
    };

    deleteById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.projectService.deleteById(req.params.id));
    };

    createCompetenceRelation = async (req: Request<{ id: number }>, res: Response) => {
        const projectId = req.params.id;
        const body = this.validateAndMatch(req);

        const createdRelations = await Promise.all(
            req.body.map(async (competence: any) => {
                return await this.projectCompetenceService.create({
                    competenceId: competence.id,
                    projectId,
                    value: competence.value,
                });
            }),
        );

        res.sendStatus(200);
    };

    deleteCompetenceRelation = async (req: Request<{ projectId: number; competenceId: number }>, res: Response) => {
        const { projectId, competenceId } = req.params;

        await this.projectCompetenceService.delete({
            $AND: [
                { field: 'project_id', value: projectId },
                { field: 'competence_id', value: competenceId },
            ],
        });

        res.sendStatus(200);
    };

    createTeacherRelation = async (req: Request<{ id: number }>, res: Response) => {
        const projectId = req.params.id;
        const body = this.validateAndMatch(req);

        const createdRelations = await Promise.all(
            req.body.map(async (teacher: any) => {
                return await this.projectTeacherService.create({
                    teacherId: teacher.id,
                    projectId,
                    role: teacher.role,
                });
            }),
        );

        res.sendStatus(200);
    };

    deleteTeacherRelation = async (req: Request<{ projectId: number; teacherId: number }>, res: Response) => {
        const { projectId, teacherId } = req.params;

        await this.projectTeacherService.delete({
            $AND: [
                { field: 'project_id', value: projectId },
                { field: 'teacher_id', value: teacherId },
            ],
        });

        res.sendStatus(200);
    };
}
