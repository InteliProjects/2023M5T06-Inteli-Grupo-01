export default interface IService<IEntity, IEntityCreate, IEntityUpdate, IRepository> {
    createAndFind(data: IEntityCreate): Promise<IEntity>;
}
