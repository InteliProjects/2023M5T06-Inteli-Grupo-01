export default interface ITeachersListTableItem {
    isEven?: boolean;
    teacher: any;
    onDoubleClickTeacher?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
