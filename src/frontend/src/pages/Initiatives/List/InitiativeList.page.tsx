import { useState, useEffect } from 'react';
import InitiativesListTable from '../../../components/pages/Initiatives/List/Table/InitiativesListTable.component';
import SkeletonListPage from '../../../components/Skeleton/List/SkeletonListPage.component';
import {
    ICondition,
    IOrder,
    IPagination,
} from '../../../services/omp/IOmp.service';
import setOrdersAndRemoveIfIsNull from '../../../helpers/setOrdersAndRemoveIfIsNull';
import Swal from 'sweetalert2';

import LoadingIcon from '../../../components/UI/SVG/Icons/LoadingIcon';
import StatusSuccessIcon from '../../../components/UI/SVG/Icons/StatusSuccessIcon';
import StatusPendingIcon from '../../../components/UI/SVG/Icons/StatusPendingIcon';
import StatusDeniedIcon from '../../../components/UI/SVG/Icons/StatusDeniedIcon';
import { useNavigate } from 'react-router-dom';
import ompInitiativeService from '../../../services/omp/initiative/OmpInitiativeService';

export default function InitiativeListPage() {
    const [initiatives, setInitiatives] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<ICondition[]>([]);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        pageSize: 15,
    });
    const [listProps, setListProps] = useState({
        search: '',
        total: 0,
        totalDenied: 0,
        totalPending: 0,
        totalSuccess: 0,
        qtReturned: 0,
        page: 1,
        pageSize: 30,
    });

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const initiativesList = await ompInitiativeService.list(
                    filters,
                    orders,
                    pagination
                );

                setInitiatives(initiativesList.data);
                setListProps({
                    ...listProps,
                    total: initiativesList.qt,
                    totalDenied: initiativesList.qtDenied,
                    totalPending: initiativesList.qtPending,
                    totalSuccess: initiativesList.qtAccepted,
                    page: initiativesList.page,
                    pageSize: initiativesList.pageSize,
                    qtReturned: initiativesList.data.length,
                });
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        })();
    }, [filters, orders, pagination]);

    const navigator = useNavigate();
    function handleDelete(id: string | number) {
        console.log('delete: ', id);

        Swal.fire({
            title: `<span className="text-5xl">Deletar?<span>`,
            icon: 'warning',
            text: `A iniciativa de id ${id} será excluído para sempre.`,
            cancelButtonText: 'Talvez mais tarde',
            showCancelButton: true,
            confirmButtonText: 'Deletar',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await ompInitiativeService.deleteById(id);
                    setInitiatives(
                        initiatives.filter((initiative) => initiative.id != id)
                    );
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

    return (
        <SkeletonListPage
            createLink='/initiatives/create'
            kpis={[
                {
                    number: listProps.totalSuccess,
                    totalNumber: listProps.total,
                    title: 'Aceitas',
                    icon: <StatusSuccessIcon />,
                },
                {
                    number: listProps.totalPending,
                    totalNumber: listProps.total,
                    title: 'Pendentes',
                    icon: <StatusPendingIcon />,
                },
                {
                    number: listProps.totalDenied,
                    totalNumber: listProps.total,
                    title: 'Negadas',
                    icon: <StatusDeniedIcon />,
                },
            ]}
            filters={filters}
            setFilters={setFilters}
            orders={orders}
            setOrders={setOrders}
            pagination={pagination}
            setPagination={setPagination}
            title='Iniciativas'
            totalItens={listProps.total}
            tooltip='Uma iniciativa é uma ideia de projeto baseada em um módulo, enviada por possíveis parceiros. Essas iniciativas ainda não foram avaliadas pelo escritório de projetos.'
        >
            {isLoading ? (
                <div className='w-full h-full flex justify-center items-center my-5'>
                    <LoadingIcon />
                </div>
            ) : (
                <InitiativesListTable
                    initiatives={initiatives}
                    orders={orders}
                    onClickDelete={handleDelete}
                    onDoubleClickHeaderColumn={(value: any, name: any) => {
                        setOrdersAndRemoveIfIsNull(
                            value,
                            name,
                            orders,
                            setOrders
                        );
                    }}
                />
            )}
        </SkeletonListPage>
    );
}
