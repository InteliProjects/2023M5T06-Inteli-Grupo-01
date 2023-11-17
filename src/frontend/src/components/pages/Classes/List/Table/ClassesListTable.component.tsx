import { useNavigate } from 'react-router-dom';
import Table from '../../../../UI/Table/Table.component';
import { IClassesListTable } from './IClassesListTable.component';
import { uuidv4 } from '../../../../../helpers/uuidv4';
import ClassesListTableItem from './Item/ClassesListTableItem.component';
import getOrderByOrdersArrAndField from '../../../../../helpers/getOrderByOrdersArrAndField';

export default function ClassesListTable({
    classes = [],
    onDoubleClickHeaderColumn,
    orders = [],
    onClickEdit,
    onClickDelete,
}: IClassesListTable) {
    const navigate = useNavigate();

    function onDoubleClickCourse(id: number) {
        navigate(`/courses/${id}/edit`);
    }

    function onDoubleClickClass(id: number) {
        navigate(`/classes/${id}`);
    }

    function onDoubleClickModule(id: number) {
        navigate(`/modules/${id}/edit`);
    }

    function onClickEditHandler(id: number) {
        if (onClickEdit) {
            onClickEdit(id);
        } else {
            navigate(`/classes/${id}/edit`);
        }
    }

    const header = [
        { text: 'ID', field: 'id' },
        { text: 'Nome', field: 'name' },
        { text: 'Status', field: 'status' },
        { text: 'Curso', field: 'ompCourseName' },
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
            {classes?.map((classEntity, index) => {
                return (
                    <ClassesListTableItem
                        key={uuidv4()}
                        isEven={index % 2 === 0}
                        classEntity={classEntity}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEditHandler}
                        onDoubleClickModule={onDoubleClickModule}
                        onDoubleClickClass={onDoubleClickClass}
                        onDoubleClickCourse={onDoubleClickCourse}
                    />
                );
            })}
        </Table>
    );
}
