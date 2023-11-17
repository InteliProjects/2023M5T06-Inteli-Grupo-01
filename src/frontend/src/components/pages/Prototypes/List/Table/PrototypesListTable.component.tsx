import { useNavigate } from 'react-router-dom';
import Table from '../../../../UI/Table/Table.component';
import { IPrototypesListTable } from './IPrototypesListTable.component';
import PrototypesListTableItem from './Item/PrototypesListTableItem.component';
import { uuidv4 } from '../../../../../helpers/uuidv4';
import getOrderByOrdersArrAndField from '../../../../../helpers/getOrderByOrdersArrAndField';

export default function PrototypesListTable({
    prototypes = [],
    onDoubleClickHeaderColumn,
    orders = [],
    onClickEdit,
    onClickDelete,
}: IPrototypesListTable) {
    const navigate = useNavigate();

    function onDoubleClickPrototype(id: number) {
        navigate(`/prototypes/${id}/edit`);
    }

    function onDoubleClickProject(id: number) {
        navigate(`/projects/${id}/edit`);
    }

    function onDoubleClickModule(id: number) {
        navigate(`/modules/${id}/edit`);
    }

    function onDoubleClickCompany(id: number) {
        navigate(`/companies/${id}/edit`);
    }

    function onDoubleClickClass(id: number) {
        navigate(`/classes/${id}`);
    }

    function onClickEditHandler(id: number) {
        if (onClickEdit) {
            onClickEdit(id);
        } else {
            navigate(`/prototypes/${id}/edit`);
        }
    }

    const header = [
        { text: 'ID', field: 'id' },
        { text: 'Nome', field: 'name' },
        { text: 'Grupo', field: 'groupName' },
        { text: 'Links' },
        { text: 'Projeto', field: 'ompProjectName' },
        { text: 'Módulo', field: 'ompModuleName' },
        { text: 'Empresa', field: 'ompCompanyName' },
        { text: 'Turma', field: 'ompClassName' },
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
            headerDefaultOnDoubleClick={onDoubleClickHeaderColumn}
            header={header}
        >
            {prototypes?.map((prototype, index) => {
                return (
                    <PrototypesListTableItem
                        key={uuidv4()}
                        isEven={index % 2 === 0}
                        prototype={prototype}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEditHandler}
                        onDoubleClickPrototype={onDoubleClickPrototype}
                        onDoubleClickProject={onDoubleClickProject}
                        onDoubleClickModule={onDoubleClickModule}
                        onDoubleClickCompany={onDoubleClickCompany}
                        onDoubleClickClass={onDoubleClickClass}
                    />
                );
            })}
        </Table>
    );
}
