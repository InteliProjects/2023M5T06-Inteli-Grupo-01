import { useState, useEffect } from 'react';
import ompPrototypeService from '../../../services/omp/prototype/OmpPrototypeService';
import PrototypesListTable from '../../../components/pages/Prototypes/List/Table/PrototypesListTable.component';
import SkeletonListPage from '../../../components/Skeleton/List/SkeletonListPage.component';
import {
    ICondition,
    IOrder,
    IPagination,
} from '../../../services/omp/IOmp.service';
import setOrdersAndRemoveIfIsNull from '../../../helpers/setOrdersAndRemoveIfIsNull';
import Swal from 'sweetalert2';

import LoadingIcon from '../../../components/UI/SVG/Icons/LoadingIcon';
import { useNavigate } from 'react-router-dom';
export default function PrototypeListPage() {
    const [prototypes, setPrototypes] = useState<any[]>([]);
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
        qtReturned: 0,
        page: 1,
        pageSize: 30,
    });

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const prototypesList = await ompPrototypeService.list(
                    filters,
                    orders,
                    pagination
                );

                setPrototypes(prototypesList.data);
                setListProps({
                    ...listProps,
                    total: prototypesList.qt,
                    page: prototypesList.page,
                    pageSize: prototypesList.pageSize,
                    qtReturned: prototypesList.data.length,
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
            text: `O protótipo de id ${id} será excluído para sempre.`,
            cancelButtonText: 'Talvez mais tarde',
            showCancelButton: true,
            confirmButtonText: 'Deletar',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await ompPrototypeService.deleteById(id);
                    setPrototypes(
                        prototypes.filter((prototype) => prototype.id != id)
                    );
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

    return (
        <SkeletonListPage
            createLink='/prototypes/create'
            kpis={[
                {
                    number: listProps.total,
                    title: 'Protótipos',
                },
            ]}
            filters={filters}
            setFilters={setFilters}
            orders={orders}
            setOrders={setOrders}
            pagination={pagination}
            setPagination={setPagination}
            title='Protótipos'
            totalItens={listProps.total}
            tooltip='Protótipos são projetos que já foram concluídos pelas turmas e estão disponíveis para análise.'
        >
            {isLoading ? (
                <div className='w-full h-full flex justify-center items-center my-5'>
                    <LoadingIcon />
                </div>
            ) : (
                <PrototypesListTable
                    prototypes={prototypes}
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
