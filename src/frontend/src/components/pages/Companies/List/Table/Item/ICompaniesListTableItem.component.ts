export default interface ICompanyListTableItem {
    isEven?: boolean;
    company: any;
    onDoubleClickCompany?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
