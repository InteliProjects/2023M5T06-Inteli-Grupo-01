import { useState, useEffect } from 'react';
import ompCourseService from '../../../services/omp/course/OmpCourseService';
import CoursesListTable from '../../../components/pages/Courses/List/Table/CoursesListTable.component';
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
export default function CourseListPage() {
    const [courses, setCourses] = useState<any[]>([]);
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
                const coursesList = await ompCourseService.list(
                    filters,
                    orders,
                    pagination
                );

                setCourses(coursesList.data);
                setListProps({
                    ...listProps,
                    total: coursesList.qt,
                    page: coursesList.page,
                    pageSize: coursesList.pageSize,
                    qtReturned: coursesList.data.length,
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
            text: `O curso de id ${id} será excluído para sempre.`,
            cancelButtonText: 'Talvez mais tarde',
            showCancelButton: true,
            confirmButtonText: 'Deletar',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await ompCourseService.deleteById(id);
                    setCourses(courses.filter((course) => course.id != id));
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

    return (
        <SkeletonListPage
            createLink='/courses/create'
            kpis={[
                {
                    number: listProps.total,
                    title: 'Cursos',
                },
            ]}
            filters={filters}
            setFilters={setFilters}
            orders={orders}
            setOrders={setOrders}
            pagination={pagination}
            setPagination={setPagination}
            title='Cursos'
            totalItens={listProps.total}
            tooltip='Os cursos abrangem as quatro graduações oferecidas pelo Inteli, cada uma com suas características distintas. Além disso, você encontrará informações sobre o ciclo comum do primeiro ano.'
        >
            {isLoading ? (
                <div className='w-full h-full flex justify-center items-center my-5'>
                    <LoadingIcon />
                </div>
            ) : (
                <CoursesListTable
                    courses={courses}
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
