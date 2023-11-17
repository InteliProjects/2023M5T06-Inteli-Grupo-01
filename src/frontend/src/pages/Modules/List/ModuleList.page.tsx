import { useState, useEffect } from 'react';
import ompModuleService from '../../../services/omp/module/OmpModuleService';
import ModulesListTable from '../../../components/pages/Modules/List/Table/ModulesListTable.component';
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
export default function ModuleListPage() {
    const [modules, setModules] = useState<any[]>([]);
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
                const modulesList = await ompModuleService.list(
                    filters,
                    orders,
                    pagination
                );

                setModules(modulesList.data);
                setListProps({
                    ...listProps,
                    total: modulesList.qt,
                    page: modulesList.page,
                    pageSize: modulesList.pageSize,
                    qtReturned: modulesList.data.length,
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
            text: `O Módulo de id ${id} será excluído para sempre.`,
            cancelButtonText: 'Talvez mais tarde',
            showCancelButton: true,
            confirmButtonText: 'Deletar',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await ompModuleService.deleteById(id);
                    setModules(modules.filter((module) => module.id != id));
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

    return (
        <SkeletonListPage
            createLink='/modules/create'
            kpis={[
                {
                    number: listProps.total,
                    title: 'Módulos',
                },
            ]}
            filters={filters}
            setFilters={setFilters}
            orders={orders}
            setOrders={setOrders}
            pagination={pagination}
            setPagination={setPagination}
            title='Módulos'
            totalItens={listProps.total}
            tooltip='Os módulos representam um período de 10 semanas de um curso, durante o qual os alunos desenvolvem protótipos e adquirem conhecimentos específicos.'
        >
            {isLoading ? (
                <div className='w-full h-full flex justify-center items-center my-5'>
                    <LoadingIcon />
                </div>
            ) : (
                <ModulesListTable
                    modules={modules}
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
