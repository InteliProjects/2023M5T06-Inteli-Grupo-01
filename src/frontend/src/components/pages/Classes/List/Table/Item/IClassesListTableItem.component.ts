export default interface IClassesListTableItem {
    isEven?: boolean;
    classEntity: any;
    onDoubleClickClass?: CallableFunction;
    onDoubleClickCourse?: CallableFunction;
    onDoubleClickModule?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
