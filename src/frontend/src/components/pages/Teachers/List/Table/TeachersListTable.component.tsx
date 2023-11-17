import { useNavigate } from 'react-router-dom';
import Table from '../../../../UI/Table/Table.component';
import { ITeachersListTable } from './ITeachersListTable.component';
import TeachersListTableItem from './Item/TeachersListTableItem.component';
import { uuidv4 } from '../../../../../helpers/uuidv4';
import getOrderByOrdersArrAndField from '../../../../../helpers/getOrderByOrdersArrAndField';

export default function TeachersListTable({
    teachers = [],
    onDoubleClickHeaderColumn,
    orders = [],
    onClickEdit,
    onClickDelete,
}: ITeachersListTable) {
    const navigate = useNavigate();

    function onDoubleClickTeacher(id: number) {
        navigate(`/teachers/${id}/edit`);
    }

    function onClickEditHandler(id: number) {
        if (onClickEdit) {
            onClickEdit(id);
        } else {
            navigate(`/teachers/${id}/edit`);
        }
    }

    const header = [
        { text: 'ID', field: 'id' },
        { text: 'Nome', field: 'name' },
        { text: 'Email', field: 'email' },
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
            {teachers?.map((teacher, index) => {
                return (
                    <TeachersListTableItem
                        key={uuidv4()}
                        isEven={index % 2 === 0}
                        teacher={teacher}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEditHandler}
                        onDoubleClickTeacher={onDoubleClickTeacher}
                    />
                );
            })}
        </Table>
    );
}
