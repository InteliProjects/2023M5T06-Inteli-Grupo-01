import { IOrder } from '../../../../../services/omp/IOmp.service';

export interface IProjectsListTable {
    projects: any[];
    orders?: IOrder[];
    onDoubleClickHeaderColumn?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
