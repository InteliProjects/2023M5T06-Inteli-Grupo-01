import {
    IModuleCompetenceEntity,
    IModuleCompetenceEntityCreate,
    IModuleCompetenceEntityUpdate,
} from '../../dto/entities/IModuleCompetence.entity.dto';
import ModuleCompetenceRepository from '../../repositories/module/ModuleCompetence.repository';
import Service from '../Service';

export default class ModuleCompetenceService extends Service<
    IModuleCompetenceEntity,
    IModuleCompetenceEntityCreate,
    IModuleCompetenceEntityUpdate,
    ModuleCompetenceRepository
> {}
