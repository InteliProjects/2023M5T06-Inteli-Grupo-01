import OmpService from '../Omp.service';

class OmpCompetenceService extends OmpService {
    constructor() {
        super('competences');
    }
}

const ompCompetenceService = new OmpCompetenceService();
export default ompCompetenceService;
