import {
    ICondition,
    IOrder,
    IPagination,
} from '../../../services/omp/IOmp.service';
import IKpi from '../../UI/Kpi/IKpi.component';

export default interface ISkeletonListPage {
    title: string;
    kpis: IKpi[];
    filters: ICondition[];
    orders: IOrder[];
    pagination: IPagination;
    createLink: string;
    setOrders: CallableFunction;
    setFilters: CallableFunction;
    setPagination: CallableFunction;
    children?: any;
    totalItens: number;
    tooltip?: string;
}
