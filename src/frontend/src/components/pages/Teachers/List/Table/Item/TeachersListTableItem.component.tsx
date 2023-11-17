import TableTd from '../../../../../UI/Table/td/TableTd.component';
import ITeachersListTableItem from './ITeachersListTableItem.component';
import EditIcon from '../../../../../UI/SVG/Icons/EditICon';
import DeleteIcon from '../../../../../UI/SVG/Icons/DeleteIcon';

export default function TeachersListTableItem({
    isEven = false,
    teacher,
    onDoubleClickTeacher,
    onClickDelete,
    onClickEdit,
}: ITeachersListTableItem) {
    function doubleClickTeacherHandler() {
        if (onDoubleClickTeacher) {
            onDoubleClickTeacher(teacher.id);
        }
    }

    function onClickDeleteHandler() {
        if (onClickDelete) {
            onClickDelete(teacher.id);
        }
    }

    function onClickUpdateHandler() {
        if (onClickEdit) {
            onClickEdit(teacher.id);
        }
    }

    return (
        <tr className={`${isEven ? 'bg-[#E5E7EB]' : ''}`}>
            <TableTd onDoubleClick={doubleClickTeacherHandler}>
                {teacher.id}
            </TableTd>
            <TableTd onDoubleClick={doubleClickTeacherHandler}>
                {teacher.name}
            </TableTd>
            <TableTd onDoubleClick={doubleClickTeacherHandler}>
                {teacher.email}
            </TableTd>
            <TableTd>
                <span className='flex flex-nowrap w-full justify-center items-center '>
                    <span
                        className='cursor-pointer mx-1'
                        onClick={onClickUpdateHandler}
                    >
                        {<EditIcon width={'20px'} />}
                    </span>
                    <span
                        className='cursor-pointer mx-1'
                        onClick={onClickDeleteHandler}
                    >
                        {<DeleteIcon width={'20px'} />}
                    </span>
                </span>
            </TableTd>
        </tr>
    );
}
