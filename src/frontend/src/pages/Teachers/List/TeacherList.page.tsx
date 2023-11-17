import { useState, useEffect } from 'react';
import ompTeacherService from '../../../services/omp/teacher/OmpTeacherService';
import TeachersListTable from '../../../components/pages/Teachers/List/Table/TeachersListTable.component';
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
export default function TeacherListPage() {
    const [teachers, setTeachers] = useState<any[]>([]);
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
                const teachersList = await ompTeacherService.list(
                    filters,
                    orders,
                    pagination
                );

                setTeachers(teachersList.data);
                setListProps({
                    ...listProps,
                    total: teachersList.qt,
                    page: teachersList.page,
                    pageSize: teachersList.pageSize,
                    qtReturned: teachersList.data.length,
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
            text: `O professor de id ${id} será excluído para sempre.`,
            cancelButtonText: 'Talvez mais tarde',
            showCancelButton: true,
            confirmButtonText: 'Deletar',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await ompTeacherService.deleteById(id);
                    setTeachers(teachers.filter((teacher) => teacher.id != id));
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

    return (
        <SkeletonListPage
            createLink='/teachers/create'
            kpis={[
                {
                    number: listProps.total,
                    title: 'Professores',
                },
            ]}
            filters={filters}
            setFilters={setFilters}
            orders={orders}
            setOrders={setOrders}
            pagination={pagination}
            setPagination={setPagination}
            title='Professores'
            totalItens={listProps.total}
            tooltip='Nesta página, você encontrará informações sobre os professores do Inteli.'
        >
            {isLoading ? (
                <div className='w-full h-full flex justify-center items-center my-5'>
                    <LoadingIcon />
                </div>
            ) : (
                <TeachersListTable
                    teachers={teachers}
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
