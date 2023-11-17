import {
    ICondition,
    IOrder,
    IPagination,
} from '../../../services/omp/IOmp.service';

export default interface ISearchFilters {
    filters?: ICondition[];
    orders?: IOrder[];
    pagination?: IPagination;
    onClick?: CallableFunction;
}
