import { IOrder } from '../../../../../services/omp/IOmp.service';

export interface ICompaniesListTable {
    companies: any[];
    orders?: IOrder[];
    onDoubleClickHeaderColumn?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
