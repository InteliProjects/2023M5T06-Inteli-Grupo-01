import OmpService from '../Omp.service';

class OmpInitiativeService extends OmpService {
    constructor() {
        super('initiatives');
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
}

const ompInitiativeService = new OmpInitiativeService();
export default ompInitiativeService;
