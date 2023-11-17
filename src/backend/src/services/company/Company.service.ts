import { ICompanyEntity, ICompanyEntityCreate, ICompanyEntityUpdate } from '../../dto/entities/ICompany.entity.dto';
import Service from '../Service';

export default class CompanyService extends Service<ICompanyEntity, ICompanyEntityCreate, ICompanyEntityUpdate> {}
