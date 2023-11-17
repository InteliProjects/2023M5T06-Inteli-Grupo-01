import { IOrder } from '../../../../UI/Table/th/ITableTh.component';

export interface IPrototypesListTable {
    prototypes: any[];
    orders?: IOrder[];
    onDoubleClickHeaderColumn?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
