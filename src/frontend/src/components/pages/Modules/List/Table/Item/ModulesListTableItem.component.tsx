import { uuidv4 } from '../../../../../../helpers/uuidv4';
import TableTd from '../../../../../UI/Table/td/TableTd.component';
import IModulesListTableItem from './IModulesListTableItem.component';
import EditIcon from '../../../../../UI/SVG/Icons/EditICon';
import DeleteIcon from '../../../../../UI/SVG/Icons/DeleteIcon';

export default function ModulesListTableItem({
    isEven = false,
    module,
    onDoubleClickCourse,
    onDoubleClickModule,
    onClickDelete,
    onClickEdit,
}: IModulesListTableItem) {
    function doubleClickModuleHandler() {
        if (onDoubleClickModule) {
            onDoubleClickModule(module.id);
        }
    }

    function doubleClickCourseHandler() {
        if (onDoubleClickCourse) {
            onDoubleClickCourse(module.course.id);
        }
    }

    function onClickDeleteHandler() {
        if (onClickDelete) {
            onClickDelete(module.id);
        }
    }

    function onClickUpdateHandler() {
        if (onClickEdit) {
            onClickEdit(module.id);
        }
    }

    return (
        <tr className={`${isEven ? 'bg-[#E5E7EB]' : ''}`}>
            <TableTd onDoubleClick={doubleClickModuleHandler}>
                {module.id}
            </TableTd>
            <TableTd onDoubleClick={doubleClickModuleHandler}>
                {module.name}
            </TableTd>
            <TableTd onDoubleClick={doubleClickCourseHandler}>
                {module.course.name}
            </TableTd>

            <TableTd onDoubleClick={doubleClickCourseHandler}>
                {(module.competences as any[]).map((competence) => {
                    return (
                        <span className='block text-xs' key={uuidv4()}>
                            - {competence.name}
                        </span>
                    );
                })}
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
