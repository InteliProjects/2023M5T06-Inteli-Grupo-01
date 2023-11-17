import OmpService from '../Omp.service';

class OmpClassService extends OmpService {
    constructor() {
        super('classes');
    }
}

const ompClassService = new OmpClassService();
export default ompClassService;
