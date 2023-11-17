import OmpService from '../Omp.service';

class OmpTeacherService extends OmpService {
    constructor() {
        super('teachers');
    }
}

const ompTeacherService = new OmpTeacherService();
export default ompTeacherService;
