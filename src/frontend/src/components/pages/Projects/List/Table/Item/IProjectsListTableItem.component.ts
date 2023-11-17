export default interface IProjectsListTableItem {
    isEven?: boolean;
    project: any;
    onDoubleClickProject?: CallableFunction;
    onDoubleClickCompany?: CallableFunction;
    onDoubleClickModule?: CallableFunction;
    onDoubleClickClass?: CallableFunction;
    onDoubleClickTeacher?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
