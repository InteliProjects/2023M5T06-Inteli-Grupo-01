import { Request, Response } from 'express';
import IController from '../IController';
import CompanyService from '../../services/company/Company.service';
import Controller from '../Controller';

export default class CompanyController extends Controller implements IController {
    private classService: CompanyService;
    constructor(classService: CompanyService) {
        super();
        this.classService = classService;
    }

    list = async (req: Request, res: Response) => {
        const configs = this.getFiltersOrdersAndPagination(req);

        const listCount = await this.classService.listCount(configs.filters);
        const data = await this.classService.list(configs.filters, configs.orders, configs.pagination);

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
