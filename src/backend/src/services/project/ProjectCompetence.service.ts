import {
    IProjectCompetenceEntity,
    IProjectCompetenceEntityCreate,
    IProjectCompetenceEntityUpdate,
} from '../../dto/entities/IProjectCompetence.entity.dto';
import ProjectCompetenceRepository from '../../repositories/project/ProjectCompetence.repository';
import Service from '../Service';

export default class ProjectCompetenceService extends Service<
    IProjectCompetenceEntity,
    IProjectCompetenceEntityCreate,
    IProjectCompetenceEntityUpdate,
    ProjectCompetenceRepository
> {}
