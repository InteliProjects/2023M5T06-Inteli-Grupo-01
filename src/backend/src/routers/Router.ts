import { Router } from 'express';

export default abstract class AbstractRouter {
    protected router: Router;
    constructor() {
        this.router = Router();
    }

    protected setRoutes() {}

    getRouter(): Router {
        return this.router;
    }
}
