import { uuidv4 } from '../../../helpers/uuidv4';
import { ICondition, IOrder } from '../../../services/omp/IOmp.service';
import ActionButton from '../../UI/Button/Action/ActionButton.components';
import PaginationButtons from '../../UI/Button/PaginationButtons/PaginationButtons.component';
import SearchBar from '../../UI/Input/SearchBar/SearchBar.component';
import Kpi from '../../UI/Kpi/Kpi.component';
import SearchFilters from '../../UI/SearchFilters/SearchFilters.component';
import Section from '../../UI/Section/Section';
import Title from '../../UI/Title/Title.component';
import CustomTooltip from '../../UI/Tooltip/CustomTooltip';
import ISkeletonListPage from './ISkeletonListPage.component';

export default function SkeletonListPage({
    title,
    kpis,
    filters,
    orders,
    pagination,
    createLink,
    setOrders,
    setFilters,
    setPagination,
    totalItens,
    children,
    tooltip,
}: ISkeletonListPage) {
    function handleSetFilters(value: string | number | null, name: string) {
        const newFilters = filters.filter((order) => order.field != name);

        if (value) {
            newFilters.push({ field: name, value });
        }

        setFilters(newFilters);
    }

    function handleSetPage(value: number) {
        setPagination({ ...pagination, page: value });
    }

    function handleSearchSubmit(value: string) {
        handleSetFilters(value, 'search');
    }

    function handleDeleteSearchFilter(
        element: ICondition | IOrder,
        context: 'FILTER' | 'ORDER'
    ) {
        if (context == 'FILTER') {
            element = element as ICondition;
            setFilters(
                filters.filter((filter) => filter.field !== element.field)
            );
        } else {
            element = element as IOrder;
            setOrders(orders.filter((order) => order.field !== element.field));
        }
    }

    return (
        <Section flexDirection='col'>
            <div className='w-full flex flex-col'>
                <div className='w-full flex justify-between'>
                    <div className='mt-5 flex items-center'>
                        <Title>{title}</Title>
                        {tooltip ? (
                            <span className='mb-1 ml-5'>
                                <CustomTooltip text={tooltip} />
                            </span>
                        ) : null}
                    </div>
                    <div
                        className={`flex ${
                            kpis.length == 1 ? 'justify-end' : 'justify-around'
                        } w-1/2`}
                    >
                        {kpis.map((kpi) => {
                            return <Kpi key={uuidv4()} {...kpi} />;
                        })}
                    </div>
                </div>
                <div className='flex'>
                    <SearchBar onSubmit={handleSearchSubmit} />
                </div>
                <div className='flex justify-between my-2'>
                    <div>
                        <SearchFilters
                            filters={filters}
                            orders={orders}
                            pagination={pagination}
                            onClick={handleDeleteSearchFilter}
                        />
                    </div>
                    <div className='h-8 mr-5'>
                        <ActionButton
                            icon={'CREATE'}
                            link={createLink}
                            text='Criar'
                        />
                    </div>
                </div>
            </div>
            <div className='w-full max-h-[80%] overflow-auto'>{children}</div>
            <div className='w-1/4'>
                <PaginationButtons
                    page={pagination.page}
                    total={totalItens}
                    pageSize={pagination.pageSize}
                    onClick={handleSetPage}
                />
            </div>
        </Section>
    );
}
