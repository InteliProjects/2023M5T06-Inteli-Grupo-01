import OmpService from '../Omp.service';

class OmpPrototypeService extends OmpService {
    constructor() {
        super('prototypes');
    }
}

const ompPrototypeService = new OmpPrototypeService();
export default ompPrototypeService;
