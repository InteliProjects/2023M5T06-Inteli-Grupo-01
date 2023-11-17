import { Request, Response } from 'express';
import IController from '../IController';
import ClassService from '../../services/class/Class.service';
import ModuleService from '../../services/module/Module.service';
import InitiativeService from '../../services/initiative/Initiative.service';
import ProjectService from '../../services/project/Project.service';
import Controller from '../Controller';

export default class ClassController extends Controller implements IController {
    private classService: ClassService;
    private moduleService: ModuleService;
    private initiativeService: InitiativeService;
    private projectService: ProjectService;

    constructor(
        classService: ClassService,
        moduleService: ModuleService,
        initiativeService: InitiativeService,
        projectService: ProjectService,
    ) {
        super();
        this.classService = classService;
        this.moduleService = moduleService;
        this.initiativeService = initiativeService;
        this.projectService = projectService;
    }

    list = async (req: Request, res: Response) => {
        const configs = this.getFiltersOrdersAndPagination(req, [
            'name',
            { table: 'omp_course', field: 'name' },
            { table: 'omp_module', field: 'name' },
        ]);

        const classes = await this.classService.listWithCourseAndModule(
            configs.filters,
            configs.orders,
            configs.pagination,
        );
        const listCount = await this.classService.listCountWithCourseAndModule(configs.filters);
        const modules = await this.moduleService.list();
        const initiatives = await this.initiativeService.list({ field: 'status', value: 'PENDING' });
        const projects = await this.projectService.listWithCompany();

        const data = classes.map((inteliClass) => {
            return {
                ...inteliClass,
                modules: modules
                    .filter((module) => module.course.id == inteliClass.course.id)
                    .map((module) => {
                        return {
                            ...module,
                            project: projects.find(
                                (project) => project.class.id == inteliClass.id && project.module.id == module.id,
                            ),
                            initiatives: initiatives.filter((initiative) => initiative.module.id == module.id),
                        };
                    }),
            };
        });

        res.json(this.makeListJson(data, listCount, configs.pagination));
    };

    findById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.classService.findById(req.params.id));
    };

    create = async (req: Request, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.classService.createAndFind(body));
    };

    updateById = async (req: Request<{ id: string }>, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.classService.updateByIdAndFind(req.params.id, body));
    };

    deleteById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.classService.deleteById(req.params.id));
    };
}
