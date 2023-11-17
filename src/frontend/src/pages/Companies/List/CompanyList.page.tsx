import { useState, useEffect } from 'react';
import ompCompanyService from '../../../services/omp/company/OmpCompanyService';
import CompaniesListTable from '../../../components/pages/Companies/List/Table/CompaniesListTable.component';
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
export default function CompanyListPage() {
    const [companies, setCompanies] = useState<any[]>([]);
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
                const companiesList = await ompCompanyService.list(
                    filters,
                    orders,
                    pagination
                );

                setCompanies(companiesList.data);
                setListProps({
                    ...listProps,
                    total: companiesList.qt,
                    page: companiesList.page,
                    pageSize: companiesList.pageSize,
                    qtReturned: companiesList.data.length,
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
            text: `A empresa de id ${id} será excluído para sempre.`,
            cancelButtonText: 'Talvez mais tarde',
            showCancelButton: true,
            confirmButtonText: 'Deletar',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await ompCompanyService.deleteById(id);
                    setCompanies(
                        companies.filter((company) => company.id != id)
                    );
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

    return (
        <SkeletonListPage
            createLink='/companies/create'
            kpis={[
                {
                    number: listProps.total,
                    title: 'Empresas',
                },
            ]}
            filters={filters}
            setFilters={setFilters}
            orders={orders}
            setOrders={setOrders}
            pagination={pagination}
            setPagination={setPagination}
            title='Empresas'
            totalItens={listProps.total}
            tooltip='Nesta seção, você encontrará informações sobre entidades governamentais, privadas e públicas que são parceiras do Inteli.'
        >
            {isLoading ? (
                <div className='w-full h-full flex justify-center items-center my-5'>
                    <LoadingIcon />
                </div>
            ) : (
                <CompaniesListTable
                    companies={companies}
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
