import OmpService from '../Omp.service';

class OmpCompanyService extends OmpService {
    constructor() {
        super('companies');
    }
}

const ompCompanyService = new OmpCompanyService();
export default ompCompanyService;
