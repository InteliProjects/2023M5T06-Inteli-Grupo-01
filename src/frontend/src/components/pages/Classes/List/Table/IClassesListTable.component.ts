import { IOrder } from '../../../../../services/omp/IOmp.service';

export interface IClassesListTable {
    classes: any[];
    orders?: IOrder[];
    onDoubleClickHeaderColumn?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
