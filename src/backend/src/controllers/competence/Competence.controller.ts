import { Request, Response } from 'express';
import IController from '../IController';
import CompetenceService from '../../services/competence/Competence.service';
import Controller from '../Controller';

export default class CompetenceController extends Controller implements IController {
    private competenceService: CompetenceService;
    constructor(competenceService: CompetenceService) {
        super();
        this.competenceService = competenceService;
    }

    list = async (req: Request, res: Response) => {
        const configs = this.getFiltersOrdersAndPagination(req);

        const listCount = await this.competenceService.listCount(configs.filters);
        const data = await this.competenceService.list(configs.filters, configs.orders, configs.pagination);

        res.json(this.makeListJson(data, listCount, configs.pagination));
    };

    findById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.competenceService.findById(req.params.id));
    };

    create = async (req: Request, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.competenceService.createAndFind(body));
    };

    updateById = async (req: Request<{ id: string }>, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.competenceService.updateByIdAndFind(req.params.id, body));
    };

    deleteById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.competenceService.deleteById(req.params.id));
    };
}
