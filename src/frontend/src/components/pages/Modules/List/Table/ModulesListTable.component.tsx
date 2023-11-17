import { useNavigate } from 'react-router-dom';
import Table from '../../../../UI/Table/Table.component';
import { IModulesListTable } from './IModulesListTable.component';
import ModulesListTableItem from './Item/ModulesListTableItem.component';
import { uuidv4 } from '../../../../../helpers/uuidv4';
import getOrderByOrdersArrAndField from '../../../../../helpers/getOrderByOrdersArrAndField';

export default function ModulesListTable({
    modules = [],
    onDoubleClickHeaderColumn,
    orders = [],
    onClickEdit,
    onClickDelete,
}: IModulesListTable) {
    const navigate = useNavigate();

    function onDoubleClickModule(id: number | string) {
        navigate(`/modules/${id}/edit`);
    }

    function onDoubleClickCourse(id: number | string) {
        navigate(`/courses/${id}/edit`);
    }

    function onClickEditHandler(id: number) {
        if (onClickEdit) {
            onClickEdit(id);
        } else {
            navigate(`/modules/${id}/edit`);
        }
    }

    const header = [
        { text: 'ID', field: 'id' },
        { text: 'Nome', field: 'name' },
        { text: 'Curso', field: 'ompCourseName' },
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
            {modules?.map((module, index) => {
                return (
                    <ModulesListTableItem
                        key={uuidv4()}
                        isEven={index % 2 === 0}
                        module={module}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEditHandler}
                        onDoubleClickModule={onDoubleClickModule}
                        onDoubleClickCourse={onDoubleClickCourse}
                    />
                );
            })}
        </Table>
    );
}
