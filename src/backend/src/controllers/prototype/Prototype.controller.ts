import { Request, Response } from 'express';
import IController from '../IController';
import PrototypeService from '../../services/prototype/Prototype.service';
import Controller from '../Controller';

export default class PrototypeController extends Controller implements IController {
    private prototypeService: PrototypeService;
    constructor(prototypeService: PrototypeService) {
        super();

        this.prototypeService = prototypeService;
    }

    list = async (req: Request, res: Response) => {
        const configs = this.getFiltersOrdersAndPagination(req, [
            'name',
            { table: 'omp_project', field: 'name' },
            { table: 'omp_module', field: 'name' },
            { table: 'omp_course', field: 'name' },
            { table: 'omp_class', field: 'name' },
        ]);

        const listCounts = await this.prototypeService.listCountWithProjectModuleCourseAndClass(configs.filters);
        const data = await this.prototypeService.listWithProjectModuleCourseAndClass(
            configs.filters,
            configs.orders,
            configs.pagination,
        );

        res.json(this.makeListJson(data, listCounts, configs.pagination));
    };

    findById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.prototypeService.findById(req.params.id));
    };

    create = async (req: Request, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.prototypeService.createAndFind(body));
    };

    updateById = async (req: Request<{ id: string }>, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.prototypeService.updateByIdAndFind(req.params.id, body));
    };

    deleteById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.prototypeService.deleteById(req.params.id));
    };
}
