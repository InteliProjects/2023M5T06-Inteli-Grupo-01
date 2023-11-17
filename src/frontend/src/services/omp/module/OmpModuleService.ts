import OmpService from '../Omp.service';

class OmpModuleService extends OmpService {
    constructor() {
        super('modules');
    }

    async createCompetenceRelations(
        id: number | string,
        data: { id: number | string }[]
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
}

const ompModuleService = new OmpModuleService();
export default ompModuleService;
