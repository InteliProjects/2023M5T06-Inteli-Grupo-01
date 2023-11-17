import { Request, Response } from 'express';
import IController from '../IController';
import ModuleService from '../../services/module/Module.service';
import Controller from '../Controller';
import ModuleCompetenceService from '../../services/module/ModuleCompetence.service';

export default class ModuleController extends Controller implements IController {
    private moduleService: ModuleService;
    private moduleCompetenceService: ModuleCompetenceService;
    constructor(moduleService: ModuleService, moduleCompetenceService: ModuleCompetenceService) {
        super();

        this.moduleService = moduleService;
        this.moduleCompetenceService = moduleCompetenceService;
    }

    list = async (req: Request, res: Response) => {
        const configs = this.getFiltersOrdersAndPagination(req, ['name', { table: 'omp_course', field: 'name' }]);

        const listCounts = await this.moduleService.listCountWithCourse(configs.filters);
        const data = await this.moduleService.listWithCourseAndCompetences(
            configs.filters,
            configs.orders,
            configs.pagination,
        );

        res.json(this.makeListJson(data, listCounts, configs.pagination));
    };

    findById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.moduleService.findWithCourseAndCompetences({ field: 'id', value: req.params.id }));
    };

    create = async (req: Request, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.moduleService.createAndFind(body));
    };

    updateById = async (req: Request<{ id: string }>, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.moduleService.updateByIdAndFind(req.params.id, body));
    };

    deleteById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.moduleService.deleteById(req.params.id));
    };

    createCompetenceRelation = async (req: Request<{ id: number }>, res: Response) => {
        const moduleId = req.params.id;
        const body = this.validateAndMatch(req);

        const createdRelations = await Promise.all(
            req.body.map(async (competence: any) => {
                return await this.moduleCompetenceService.create({ competenceId: competence.id, moduleId });
            }),
        );

        res.sendStatus(200);
    };

    deleteCompetenceRelation = async (req: Request<{ moduleId: number; competenceId: number }>, res: Response) => {
        const { moduleId, competenceId } = req.params;

        await this.moduleCompetenceService.delete({
            $AND: [
                { field: 'module_id', value: moduleId },
                { field: 'competence_id', value: competenceId },
            ],
        });

        res.sendStatus(200);
    };
}
