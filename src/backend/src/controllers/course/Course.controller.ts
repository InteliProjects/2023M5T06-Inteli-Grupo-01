import { Request, Response } from 'express';
import CourseService from '../../services/course/Course.service';
import IController from '../IController';
import ModuleService from '../../services/module/Module.service';
import Controller from '../Controller';

export default class CourseController extends Controller implements IController {
    private courseService: CourseService;
    private moduleService: ModuleService;

    constructor(courseService: CourseService, moduleService: ModuleService) {
        super();
        this.courseService = courseService;
        this.moduleService = moduleService;
    }

    list = async (req: Request, res: Response) => {
        const configs = this.getFiltersOrdersAndPagination(req);

        const courses = await this.courseService.listWithKpis(configs.filters, configs.orders, configs.pagination);
        const listCount = await this.courseService.listCount(configs.filters);
        const modules = await this.moduleService.list();

        const data = courses.map((course: any) => {
            return {
                ...course,
                modules: modules.filter((module) => module.course.id == course.id),
            };
        });

        res.json(this.makeListJson(data, listCount, configs.pagination));
    };

    findById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.courseService.findById(req.params.id));
    };

    create = async (req: Request, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.courseService.createAndFind(body));
    };

    updateById = async (req: Request<{ id: string }>, res: Response) => {
        const body = this.validateAndMatch(req);
        res.json(await this.courseService.updateByIdAndFind(req.params.id, body));
    };

    deleteById = async (req: Request<{ id: string }>, res: Response) => {
        res.json(await this.courseService.deleteById(req.params.id));
    };
}
