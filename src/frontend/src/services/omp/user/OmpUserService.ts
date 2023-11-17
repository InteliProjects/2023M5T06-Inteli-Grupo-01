import OmpService from '../Omp.service';

class OmpUserService extends OmpService {
    constructor() {
        super('users');
    }
}

const ompUserService = new OmpUserService();
export default ompUserService;
