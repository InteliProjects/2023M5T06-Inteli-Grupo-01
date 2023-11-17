import OmpService from '../Omp.service';

class OmpCourseService extends OmpService {
    constructor() {
        super('courses');
    }
}

const ompCourseService = new OmpCourseService();
export default ompCourseService;
