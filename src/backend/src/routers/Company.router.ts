import AbstractRouter from './Router';
import CompanyController from '../controllers/company/Company.controller';
import CompanyService from '../services/company/Company.service';
import CompanyRepository from '../repositories/company/Company.repository';
import IMysqlConnection from '../connections/mysql/IMysql.connection';
import { companyAdminCreateValidator } from '../validators/company/company.create.validator';
import { companyEditValidator } from '../validators/company/company.edit.validator';

export default class CompanyRouter extends AbstractRouter {
    private companyController: CompanyController;

    constructor(databaseConnection: IMysqlConnection) {
        super();
        this.companyController = new CompanyController(new CompanyService(new CompanyRepository(databaseConnection)));
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/', this.companyController.list);
        this.router.post('/', companyAdminCreateValidator, this.companyController.create);
        this.router.get('/:id', this.companyController.findById);
        this.router.patch('/:id', companyEditValidator, this.companyController.updateById);
        this.router.delete('/:id', this.companyController.deleteById);
    }
}
