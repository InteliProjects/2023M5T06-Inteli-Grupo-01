import { Request, Response } from 'express';
import IController from '../IController';
import UserService from '../../services/user/User.service';
import Controller from '../Controller';

export default class UserController extends Controller implements IController {
    private userService: UserService;
    constructor(userService: UserService) {
        super();
        this.userService = userService;
    }

    list = async (req: Request, res: Response) => {
        const configs = this.getFiltersOrdersAndPagination(req);
        const data = await this.userService.list(configs.filters, configs.orders, configs.pagination);
        const listCount = await this.userService.listCount(configs.filters);

        res.json(this.makeListJson(data, listCount, configs.pagination));
    };

    findById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.userService.findById(req.params.id));
    };

    create = async (req: Request, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.userService.createAndFind(body));
    };

    updateById = async (req: Request<{ id: string }>, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.userService.updateByIdAndFind(req.params.id, body));
    };

    deleteById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.userService.deleteById(req.params.id));
    };
}
