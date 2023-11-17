export default interface IInitiativesListTableItem {
    isEven?: boolean;
    module: any;
    onDoubleClickCourse?: CallableFunction;
    onDoubleClickModule?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
