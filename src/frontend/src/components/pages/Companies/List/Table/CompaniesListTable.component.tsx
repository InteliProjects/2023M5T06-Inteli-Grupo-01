import { useNavigate } from 'react-router-dom';
import Table from '../../../../UI/Table/Table.component';
import { ICompaniesListTable } from './ICompaniesListTable.component';
import CompaniesListTableItem from './Item/CompaniesListTableItem.component';
import { uuidv4 } from '../../../../../helpers/uuidv4';
import getOrderByOrdersArrAndField from '../../../../../helpers/getOrderByOrdersArrAndField';

export default function CompaniesListTable({
    companies = [],
    onDoubleClickHeaderColumn,
    orders = [],
    onClickEdit,
    onClickDelete,
}: ICompaniesListTable) {
    const navigate = useNavigate();

    function onDoubleClickCompany(id: number) {
        navigate(`/companies/${id}/edit`);
    }

    function onClickEditHandler(id: number) {
        if (onClickEdit) {
            onClickEdit(id);
        } else {
            navigate(`/companies/${id}/edit`);
        }
    }

    const header = [
        { text: 'ID', field: 'id' },
        { text: 'Nome', field: 'name' },
        { text: 'Email', field: 'email' },
        { text: 'Tamanho', field: 'size' },
        { text: 'Setor', field: 'sector' },
        { text: 'Ramo', field: 'branch' },
        { text: 'Atividade', field: 'activity' },
        { text: '' },
    ].map((headerElement: any) => {
        headerElement.order = getOrderByOrdersArrAndField(
            headerElement.field,
            orders
        );
        return headerElement;
    });

    return (
        <Table
            header={header}
            headerDefaultOnDoubleClick={onDoubleClickHeaderColumn}
        >
            {companies?.map((company, index) => {
                return (
                    <CompaniesListTableItem
                        key={uuidv4()}
                        isEven={index % 2 === 0}
                        company={company}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEditHandler}
                        onDoubleClickCompany={onDoubleClickCompany}
                    />
                );
            })}
        </Table>
    );
}
