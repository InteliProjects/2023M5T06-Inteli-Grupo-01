import {
    ICompetenceEntity,
    ICompetenceEntityCreate,
    ICompetenceEntityUpdate,
} from '../../dto/entities/ICompetence.entity.dto';
import Service from '../Service';

export default class CompetenceService extends Service<
    ICompetenceEntity,
    ICompetenceEntityCreate,
    ICompetenceEntityUpdate
> {}
