import { IFileEntity, IFileEntityCreate, IFileEntityUpdate } from '../../dto/entities/IFile.entity.dto';
import Service from '../Service';

export default class FileService extends Service<IFileEntity, IFileEntityCreate, IFileEntityUpdate> {}
