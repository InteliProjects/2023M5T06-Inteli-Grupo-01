import { uuidv4 } from '../../../helpers/uuidv4';
import { ICondition, IOrder } from '../../../services/omp/IOmp.service';
import ISearchFilters from './ISearchFilters.component';
import SearchFilterPill from './SearchFilterPill/SearchFilterPill';

export default function SearchFilters({
    filters,
    orders,
    pagination,
    onClick,
}: ISearchFilters) {
    function onClickHandler(
        element: ICondition | IOrder,
        context: 'FILTER' | 'ORDER'
    ) {
        if (onClick) {
            onClick(element, context);
        }
    }

    const pills = [];

    filters?.forEach((filter) => {
        pills.push(
            <SearchFilterPill
                text={filter.field}
                value={filter.value}
                key={uuidv4()}
                onClick={() => onClickHandler(filter, 'FILTER')}
            />
        );
    });

    orders?.forEach((order) => {
        pills.push(
            <SearchFilterPill
                text={order.field}
                value={order.order}
                key={uuidv4()}
                onClick={() => onClickHandler(order, 'ORDER')}
            />
        );
    });

    if (pagination) {
        pills.push(
            <SearchFilterPill
                text='Página'
                value={pagination.page}
                key={uuidv4()}
            />
        );

        if (pagination.pageSize) {
            <SearchFilterPill
                text='Itens p/ página'
                value={pagination.pageSize}
                key={uuidv4()}
            />;
        }
    }

    return <div className='flex flex-wrap'>{pills}</div>;
}
