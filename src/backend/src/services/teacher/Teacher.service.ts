import { ITeacherEntity, ITeacherEntityCreate, ITeacherEntityUpdate } from '../../dto/entities/ITeacher.entity.dto';
import Service from '../Service';

export default class TeacherService extends Service<ITeacherEntity, ITeacherEntityCreate, ITeacherEntityUpdate> {}
