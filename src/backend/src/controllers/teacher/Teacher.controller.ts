import { Request, Response } from 'express';
import IController from '../IController';
import TeacherService from '../../services/teacher/Teacher.service';
import Controller from '../Controller';

export default class TeacherController extends Controller implements IController {
    private teacherService: TeacherService;
    constructor(teacherService: TeacherService) {
        super();

        this.teacherService = teacherService;
    }

    list = async (req: Request, res: Response) => {
        const configs = this.getFiltersOrdersAndPagination(req);
        const data = await this.teacherService.list(configs.filters, configs.orders, configs.pagination);
        const listCounts = await this.teacherService.listCount(configs.filters);

        res.json(this.makeListJson(data, listCounts, configs.pagination));
    };

    findById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.teacherService.findById(req.params.id));
    };

    create = async (req: Request, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.teacherService.createAndFind(body));
    };

    updateById = async (req: Request<{ id: string }>, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.teacherService.updateByIdAndFind(req.params.id, body));
    };

    deleteById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.teacherService.deleteById(req.params.id));
    };
}
