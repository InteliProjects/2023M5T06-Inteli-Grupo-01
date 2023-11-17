export default interface ICoursesListTableItem {
    isEven?: boolean;
    course: any;
    onDoubleClickCourse?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
