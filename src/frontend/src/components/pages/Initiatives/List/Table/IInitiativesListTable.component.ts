import { IOrder } from '../../../../../services/omp/IOmp.service';

export interface IInitiativesListTable {
    initiatives: any[];
    orders?: IOrder[];
    onDoubleClickHeaderColumn?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
