import { IOrder } from '../../../../../services/omp/IOmp.service';

export interface ICoursesListTable {
    courses: any[];
    orders?: IOrder[];
    onDoubleClickHeaderColumn?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
