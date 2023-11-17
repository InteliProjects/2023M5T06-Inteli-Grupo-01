import { IOrder } from '../../../../../services/omp/IOmp.service';

export interface ICompetencesListTable {
    competences: any[];
    orders?: IOrder[];
    onDoubleClickHeaderColumn?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
