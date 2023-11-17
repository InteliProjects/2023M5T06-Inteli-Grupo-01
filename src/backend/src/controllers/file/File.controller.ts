import { Request, Response } from 'express';
import IController from '../IController';
import FileService from '../../services/file/File.service';
import Controller from '../Controller';

export default class FileController extends Controller implements IController {
    private fileService: FileService;
    constructor(fileService: FileService) {
        super();
        this.fileService = fileService;
        this.fieldsToSearch = ['link'];
    }

    list = async (req: Request, res: Response) => {
        const configs = this.getFiltersOrdersAndPagination(req);

        const listCounts = await this.fileService.listCount(configs.filters);
        const data = await this.fileService.list(configs.filters, configs.orders, configs.pagination);

        res.json(this.makeListJson(data, listCounts, configs.pagination));
    };

    findById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.fileService.findById(req.params.id));
    };

    create = async (req: Request, res: Response) => {
        res.json(await this.fileService.createAndFind(req.body));
    };

    updateById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.fileService.updateByIdAndFind(req.params.id, req.body));
    };

    deleteById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.fileService.deleteById(req.params.id));
    };
}
