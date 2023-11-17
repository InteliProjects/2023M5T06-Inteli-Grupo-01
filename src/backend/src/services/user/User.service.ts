import { IUserEntity, IUserEntityCreate, IUserEntityUpdate } from '../../dto/entities/IUser.entity.dto';
import Service from '../Service';

export default class UserService extends Service<IUserEntity, IUserEntityCreate, IUserEntityUpdate> {}
