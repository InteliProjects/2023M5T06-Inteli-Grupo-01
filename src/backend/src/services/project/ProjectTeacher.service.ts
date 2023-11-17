import {
    IProjectTeacherEntity,
    IProjectTeacherEntityCreate,
    IProjectTeacherEntityUpdate,
} from '../../dto/entities/IProjectTeacher.entity.dto';
import ProjectTeacherRepository from '../../repositories/project/ProjectTeacher.repository';
import Service from '../Service';

export default class ProjectTeacherService extends Service<
    IProjectTeacherEntity,
    IProjectTeacherEntityCreate,
    IProjectTeacherEntityUpdate,
    ProjectTeacherRepository
> {}
