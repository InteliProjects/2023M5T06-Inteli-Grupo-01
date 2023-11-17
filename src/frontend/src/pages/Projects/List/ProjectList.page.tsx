import { useState, useEffect } from 'react';
import ompProjectService from '../../../services/omp/project/OmpProjectService';
import ProjectsListTable from '../../../components/pages/Projects/List/Table/ProjectsListTable.component';
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
export default function ProjectListPage() {
    const [projects, setProjects] = useState<any[]>([]);
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
                const projectsList = await ompProjectService.list(
                    filters,
                    orders,
                    pagination
                );

                setProjects(projectsList.data);
                setListProps({
                    ...listProps,
                    total: projectsList.qt,
                    page: projectsList.page,
                    pageSize: projectsList.pageSize,
                    qtReturned: projectsList.data.length,
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
            title: `Excluir`,
            icon: 'warning',
            text: `O projeto de id ${id} será excluído para sempre.`,
            cancelButtonText: 'Talvez mais tarde',
            showCancelButton: true,

            confirmButtonText: 'Deletar',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await ompProjectService.deleteById(id);
                    setProjects(projects.filter((project) => project.id != id));
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

    return (
        <SkeletonListPage
            createLink='/projects/create'
            kpis={[
                {
                    number: listProps.total,
                    title: 'Projetos',
                },
            ]}
            filters={filters}
            setFilters={setFilters}
            orders={orders}
            setOrders={setOrders}
            pagination={pagination}
            setPagination={setPagination}
            title='Projetos'
            totalItens={listProps.total}
            tooltip='Os projetos são as iniciativas que foram avaliadas e aprovadas pelos funcionários do escritório de projetos. Eles são alocados para turmas específicas.'
        >
            {isLoading ? (
                <div className='w-full h-full flex justify-center items-center my-5'>
                    <LoadingIcon />
                </div>
            ) : (
                <ProjectsListTable
                    projects={projects}
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
