import express, { Express } from 'express';
import cors from 'cors';
import fs from 'fs';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import IEnvironmentConfig from './config/environment/IEnvironment.config';
import IMysqlConnection from '../connections/mysql/IMysql.connection';
import loggerMiddleware from '../middlewares/logger.middleware';
import MysqlConnection from '../connections/mysql/Mysql.connection';
import AbstractRouter from '../routers/Router';
import CourseRouter from '../routers/Course.router';
import CompanyRouter from '../routers/Company.router';
import CompetenceRouter from '../routers/Competence.router';
import FileRouter from '../routers/File.router';
import InitiativeRouter from '../routers/Initiative.router';
import ModuleRouter from '../routers/Module.router';
import ProjectRouter from '../routers/Project.router';
import PrototypeRouter from '../routers/Prototype.router';
import TeacherRouter from '../routers/Teacher.router';
import UserRouter from '../routers/User.router';
import ClassRouter from '../routers/Class.router';
import errorHandlerMiddleware from '../middlewares/errorHandler.middleware';
import notFoundMiddleware from '../middlewares/notFound.middleware';

export default class App {
    private environmentConfig: IEnvironmentConfig;
    private databaseConnection?: IMysqlConnection;
    private express: Express;
    private port: number;
    private promiseConnection?: Promise<void> | void;

    constructor(environmentConfig: IEnvironmentConfig) {
        this.environmentConfig = environmentConfig;
        this.express = express();
        this.port = this.environmentConfig.getVars().port;

        this.promiseConnection = this.configureApp();
    }

    getExpress() {
        return this.express;
    }

    async configureApp() {
        await this.setConnections();
        this.configureBeforeRouters();
        this.setRouters();
        this.configureAfterRouters();
    }

    getConnectionPromise() {
        return this.promiseConnection;
    }

    configureBeforeRouters() {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(loggerMiddleware);
        this.configureSwagger();
    }

    configureAfterRouters() {
        this.express.use(errorHandlerMiddleware);
        this.express.use('*', notFoundMiddleware);
    }

    configureSwagger() {
        try {
            const file = fs.readFileSync(`${__dirname}/../../swagger.module.json`);
            this.express.get('/swagger-ui-init.js', ...swaggerUi.serve);
            this.express.get('/swagger-ui.css', ...swaggerUi.serve);
            this.express.get('/swagger-ui-bundle.js', ...swaggerUi.serve);
            this.express.get('/swagger-ui-standalone-preset.js', ...swaggerUi.serve);
            this.express.get('/', swaggerUi.serve, swaggerUi.setup(JSON.parse(file as unknown as string)));
        } catch (error) {
            console.log(`error trying to use swagger`, error);
        }
    }

    setRouters() {
        this.setRouterAndUse(ClassRouter, '/classes');
        this.setRouterAndUse(CompanyRouter, '/companies');
        this.setRouterAndUse(CompetenceRouter, '/competences');
        this.setRouterAndUse(CourseRouter, '/courses');
        this.setRouterAndUse(FileRouter, '/files');
        this.setRouterAndUse(InitiativeRouter, '/initiatives');
        this.setRouterAndUse(ModuleRouter, '/modules');
        this.setRouterAndUse(ProjectRouter, '/projects');
        this.setRouterAndUse(PrototypeRouter, '/prototypes');
        this.setRouterAndUse(TeacherRouter, '/teachers');
        this.setRouterAndUse(UserRouter, '/users');
    }

    private setRouterAndUse(Router: new (...args: any[]) => AbstractRouter, prefix?: string) {
        const router = new Router(this.databaseConnection);
        this.express.use(prefix || '', router.getRouter());
    }

    async setConnections() {
        this.databaseConnection = new MysqlConnection(this.environmentConfig.getVars().database);
        await this.databaseConnection.connect();
    }

    async close() {
        if (this.databaseConnection) {
            await this.databaseConnection.close();
        }
    }

    start() {
        this.express.listen(this.port, () => {
            console.log(`Listening ${this.port} port`);
        });
    }
}
