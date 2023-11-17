import { useNavigate } from 'react-router-dom';
import Table from '../../../../UI/Table/Table.component';
import { ICoursesListTable } from './ICoursesListTable.component';
import CoursesListTableItem from './Item/CoursesListTableItem.component';
import { uuidv4 } from '../../../../../helpers/uuidv4';
import getOrderByOrdersArrAndField from '../../../../../helpers/getOrderByOrdersArrAndField';

export default function CoursesListTable({
    courses = [],
    onDoubleClickHeaderColumn,
    orders = [],
    onClickEdit,
    onClickDelete,
}: ICoursesListTable) {
    const navigate = useNavigate();

    function onDoubleClickCourse(id: number) {
        navigate(`/courses/${id}/edit`);
    }

    function onClickEditHandler(id: number) {
        if (onClickEdit) {
            onClickEdit(id);
        } else {
            navigate(`/courses/${id}/edit`);
        }
    }

    const header = [
        { text: 'ID', field: 'id' },
        { text: 'Nome', field: 'name' },
        { text: 'Descrição', field: 'description' },
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
            {courses?.map((course, index) => {
                return (
                    <CoursesListTableItem
                        key={uuidv4()}
                        isEven={index % 2 === 0}
                        course={course}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEditHandler}
                        onDoubleClickCourse={onDoubleClickCourse}
                    />
                );
            })}
        </Table>
    );
}
