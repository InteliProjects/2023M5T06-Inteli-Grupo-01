import TableTd from '../../../../../UI/Table/td/TableTd.component';
import ICoursesListTableItem from './ICoursesListTableItem.component';
import EditIcon from '../../../../../UI/SVG/Icons/EditICon';
import DeleteIcon from '../../../../../UI/SVG/Icons/DeleteIcon';

export default function CoursesListTableItem({
    isEven = false,
    course,
    onDoubleClickCourse,
    onClickDelete,
    onClickEdit,
}: ICoursesListTableItem) {
    function doubleClickCourseHandler() {
        if (onDoubleClickCourse) {
            onDoubleClickCourse(course.id);
        }
    }

    function onClickDeleteHandler() {
        if (onClickDelete) {
            onClickDelete(course.id);
        }
    }

    function onClickUpdateHandler() {
        if (onClickEdit) {
            onClickEdit(course.id);
        }
    }

    console.log(isEven);

    return (
        <tr className={`${isEven ? 'bg-[#E5E7EB]' : ''}`}>
            <TableTd onDoubleClick={doubleClickCourseHandler}>
                {course.id}
            </TableTd>
            <TableTd onDoubleClick={doubleClickCourseHandler}>
                {course.name}
            </TableTd>
            <TableTd onDoubleClick={doubleClickCourseHandler}>
                {course.observation}
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
