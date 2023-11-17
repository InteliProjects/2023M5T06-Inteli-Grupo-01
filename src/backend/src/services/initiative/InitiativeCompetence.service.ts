import {
    IInitiativeCompetenceEntity,
    IInitiativeCompetenceEntityCreate,
    IInitiativeCompetenceEntityUpdate,
} from '../../dto/entities/IInitiativeCompetence.entity.dto';
import InitiativeCompetenceRepository from '../../repositories/initiative/InitiativeCompetence.repository';
import Service from '../Service';

export default class InitiativeCompetenceService extends Service<
    IInitiativeCompetenceEntity,
    IInitiativeCompetenceEntityCreate,
    IInitiativeCompetenceEntityUpdate,
    InitiativeCompetenceRepository
> {}
