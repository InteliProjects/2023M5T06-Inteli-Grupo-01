export default interface IInitiativesListTableItem {
    isEven?: boolean;
    initiative: any;
    onDoubleClickInitiative?: CallableFunction;
    onDoubleClickCompany?: CallableFunction;
    onDoubleClickModule?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
