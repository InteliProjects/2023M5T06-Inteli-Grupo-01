import { IOrder } from '../../../../../services/omp/IOmp.service';

export interface IModulesListTable {
    modules: any[];
    orders?: IOrder[];
    onDoubleClickHeaderColumn?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
