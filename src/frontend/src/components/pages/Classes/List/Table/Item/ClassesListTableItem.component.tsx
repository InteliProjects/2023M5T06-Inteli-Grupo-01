import TableTd from '../../../../../UI/Table/td/TableTd.component';
import IClassesListTableItem from './IClassesListTableItem.component';
import EditIcon from '../../../../../UI/SVG/Icons/EditICon';
import DeleteIcon from '../../../../../UI/SVG/Icons/DeleteIcon';

export default function ClassesListTableItem({
    isEven = false,
    classEntity,
    onDoubleClickClass,
    onDoubleClickCourse,
    onDoubleClickModule,
    onClickDelete,
    onClickEdit,
}: IClassesListTableItem) {
    function doubleClickClassHandler() {
        if (onDoubleClickClass) {
            onDoubleClickClass(classEntity.id);
        }
    }
    function doubleClickCourseHandler() {
        if (onDoubleClickCourse) {
            onDoubleClickCourse(classEntity.course.id);
        }
    }
    function doubleClickModuleHandler() {
        if (onDoubleClickModule) {
            onDoubleClickModule(classEntity?.current?.module?.id);
        }
    }

    function onClickDeleteHandler() {
        if (onClickDelete) {
            onClickDelete(classEntity.id);
        }
    }

    function onClickUpdateHandler() {
        if (onClickEdit) {
            onClickEdit(classEntity.id);
        }
    }

    const currentModuleId = classEntity?.current?.module?.id;

    return (
        <tr className={`${isEven ? 'bg-[#E5E7EB]' : ''}`}>
            <TableTd onDoubleClick={doubleClickClassHandler}>
                {classEntity.id}
            </TableTd>
            <TableTd onDoubleClick={doubleClickClassHandler}>
                {classEntity.name}
            </TableTd>
            <TableTd onDoubleClick={doubleClickClassHandler}>
                {classEntity.status}
            </TableTd>
            <TableTd
                onDoubleClick={() =>
                    currentModuleId
                        ? doubleClickModuleHandler()
                        : doubleClickCourseHandler()
                }
            >
                <span className='block'>{classEntity.course.name}</span>
                {currentModuleId ? (
                    <span className='block'>
                        Mod. {classEntity.current.module.order}
                    </span>
                ) : null}
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
