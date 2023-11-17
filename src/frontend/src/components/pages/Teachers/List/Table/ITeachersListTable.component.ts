import { IOrder } from '../../../../../services/omp/IOmp.service';

export interface ITeachersListTable {
    teachers: any[];
    orders?: IOrder[];
    onDoubleClickHeaderColumn?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
