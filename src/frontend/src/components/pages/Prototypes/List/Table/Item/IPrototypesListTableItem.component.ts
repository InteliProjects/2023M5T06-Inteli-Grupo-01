export default interface IPrototypesListTableItem {
    isEven?: boolean;
    prototype: any;
    onDoubleClickPrototype?: CallableFunction;
    onDoubleClickProject?: CallableFunction;
    onDoubleClickModule?: CallableFunction;
    onDoubleClickClass?: CallableFunction;
    onDoubleClickCompany?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
