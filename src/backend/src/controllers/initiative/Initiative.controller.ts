import { Request, Response } from 'express';
import IController from '../IController';
import InitiativeService from '../../services/initiative/Initiative.service';
import Controller from '../Controller';
import InitiativeCompetenceService from '../../services/initiative/InitiativeCompetence.service';

export default class InitiativeController extends Controller implements IController {
    private initiativeService: InitiativeService;
    private initiativeCompetenceService: InitiativeCompetenceService;

    constructor(initiativeService: InitiativeService, initiativeCompetenceService: InitiativeCompetenceService) {
        super();

        this.initiativeService = initiativeService;
        this.initiativeCompetenceService = initiativeCompetenceService;
    }

    list = async (req: Request, res: Response) => {
        const configs = this.getFiltersOrdersAndPagination(req, [
            'name',
            { table: 'omp_module', field: 'name' },
            { table: 'omp_company', field: 'name' },
        ]);

        const listCounts = await this.initiativeService.listCountWithModuleAndCompany(configs.filters);
        const data = await this.initiativeService.listWithModuleCompanyAndCompetences(
            configs.filters,
            configs.orders,
            configs.pagination,
        );

        res.json(this.makeListJson(data, listCounts, configs.pagination));
    };

    findById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(
            await this.initiativeService.findWithModuleCompanyAndCompetences({ field: 'id', value: req.params.id }),
        );
    };

    create = async (req: Request, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.initiativeService.createAndFind(body));
    };

    updateById = async (req: Request<{ id: string }>, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.initiativeService.updateByIdAndFind(req.params.id, body));
    };

    deleteById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.initiativeService.deleteById(req.params.id));
    };

    createCompetenceRelation = async (req: Request<{ id: number }>, res: Response) => {
        const initiativeId = req.params.id;
        const body = this.validateAndMatch(req);

        const createdRelations = await Promise.all(
            req.body.map(async (competence: any) => {
                return await this.initiativeCompetenceService.create({
                    competenceId: competence.id,
                    initiativeId,
                    value: competence.value,
                });
            }),
        );

        res.sendStatus(200);
    };

    deleteCompetenceRelation = async (req: Request<{ initiativeId: number; competenceId: number }>, res: Response) => {
        const { initiativeId, competenceId } = req.params;

        await this.initiativeCompetenceService.delete({
            $AND: [
                { field: 'initiative_id', value: initiativeId },
                { field: 'competence_id', value: competenceId },
            ],
        });

        res.sendStatus(200);
    };
}
