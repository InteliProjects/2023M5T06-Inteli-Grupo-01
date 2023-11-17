import OmpService from '../Omp.service';

class OmpProjectService extends OmpService {
    constructor() {
        super('projects');
    }

    async createCompetenceRelations(
        id: number | string,
        data: { id: number | string; value: number }[]
    ) {
        const response = await this.axios.post<any>(`/${id}/competences`, data);
        return response.data;
    }

    async deleteCompetenceRelation(
        id: number | string,
        competenceId: number | string
    ) {
        const response = await this.axios.delete(
            `/${id}/competences/${competenceId}`
        );
        return response.data;
    }

    async createTeacherRelations(
        id: number | string,
        data: { id: number | string; role: string }[]
    ) {
        const response = await this.axios.post<any>(`/${id}/teachers`, data);
        return response.data;
    }

    async deleteTeacherRelation(
        id: number | string,
        teacherId: number | string
    ) {
        const response = await this.axios.delete(
            `/${id}/teachers/${teacherId}`
        );
        return response.data;
    }
}

const ompProjectService = new OmpProjectService();
export default ompProjectService;
