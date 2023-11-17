import { useNavigate } from 'react-router-dom';
import Table from '../../../../UI/Table/Table.component';
import { IInitiativesListTable } from './IInitiativesListTable.component';
import InitiativesListTableItem from './Item/InitiativesListTableItem.component';
import { uuidv4 } from '../../../../../helpers/uuidv4';
import getOrderByOrdersArrAndField from '../../../../../helpers/getOrderByOrdersArrAndField';

export default function InitiativesListTable({
    initiatives = [],
    onDoubleClickHeaderColumn,
    orders = [],
    onClickEdit,
    onClickDelete,
}: IInitiativesListTable) {
    const navigate = useNavigate();

    function onDoubleClickCompany(id: number) {
        navigate(`/companies/${id}/edit`);
    }

    function onDoubleClickInitiative(id: number) {
        navigate(`/initiatives/${id}/edit`);
    }

    function onDoubleClickModule(id: number) {
        navigate(`/modules/${id}/edit`);
    }

    function onClickEditHandler(id: number) {
        if (onClickEdit) {
            onClickEdit(id);
        } else {
            navigate(`/initiatives/${id}/edit`);
        }
    }

    const header = [
        { text: 'ID', field: 'id' },
        { text: 'Status', field: 'status' },
        { text: 'Empresa', field: 'ompCompanyName' },
        { text: 'Nome', field: 'name' },
        { text: 'Módulo', field: 'ompModuleName' },
        { text: 'Competências' },
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
            {initiatives?.map((initiative, index) => {
                return (
                    <InitiativesListTableItem
                        key={uuidv4()}
                        isEven={index % 2 === 0}
                        initiative={initiative}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEditHandler}
                        onDoubleClickCompany={onDoubleClickCompany}
                        onDoubleClickInitiative={onDoubleClickInitiative}
                        onDoubleClickModule={onDoubleClickModule}
                    />
                );
            })}
        </Table>
    );
}
