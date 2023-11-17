import { uuidv4 } from '../../../../../../helpers/uuidv4';
import TableTd from '../../../../../UI/Table/td/TableTd.component';
import IProjectsListTableItem from './IProjectsListTableItem.component';
import EditIcon from '../../../../../UI/SVG/Icons/EditICon';
import DeleteIcon from '../../../../../UI/SVG/Icons/DeleteIcon';

export default function ProjectsListTableItem({
    isEven = false,
    project,
    onDoubleClickCompany,
    onDoubleClickProject,
    onDoubleClickModule,
    onDoubleClickClass,
    onDoubleClickTeacher,
    onClickDelete,
    onClickEdit,
}: IProjectsListTableItem) {
    function doubleClickProjectHandler() {
        if (onDoubleClickProject) {
            onDoubleClickProject(project.id);
        }
    }
    function doubleClickCompanyHandler() {
        if (onDoubleClickCompany) {
            onDoubleClickCompany(project.company.id);
        }
    }
    function doubleClickModuleHandler() {
        if (onDoubleClickModule) {
            onDoubleClickModule(project.module.id);
        }
    }
    function doubleClickClassHandler() {
        if (onDoubleClickClass) {
            onDoubleClickClass(project.module.id);
        }
    }

    const orientador = (project.teachers as any[]).find(
        (teacher) => String(teacher.role).toLowerCase() == 'orientador'
    );

    function doubleClickTeacherHandler(id = orientador?.id) {
        if (onDoubleClickTeacher) {
            onDoubleClickTeacher(id);
        }
    }

    function onClickDeleteHandler() {
        if (onClickDelete) {
            onClickDelete(project.id);
        }
    }

    function onClickUpdateHandler() {
        if (onClickEdit) {
            onClickEdit(project.id);
        }
    }

    return (
        <tr className={`${isEven ? 'bg-[#E5E7EB]' : ''}`}>
            <TableTd onDoubleClick={doubleClickProjectHandler}>
                {project.id}
            </TableTd>
            <TableTd onDoubleClick={doubleClickProjectHandler}>
                {project.name}
            </TableTd>
            <TableTd onDoubleClick={doubleClickProjectHandler}>
                {project.status}
            </TableTd>

            <TableTd onDoubleClick={doubleClickCompanyHandler}>
                {project.company.name}
            </TableTd>

            <TableTd onDoubleClick={doubleClickModuleHandler}>
                <span className='block'>Mod. {project.module.order}</span>
                <span>{project.module.course.name}</span>
            </TableTd>

            <TableTd onDoubleClick={doubleClickProjectHandler}>
                {(project.competences as any[]).map((competence) => {
                    return (
                        <span className='block text-xs' key={uuidv4()}>
                            - {competence.name}: {competence.value}/5
                        </span>
                    );
                })}
            </TableTd>
            <TableTd
                onDoubleClick={() =>
                    orientador
                        ? doubleClickTeacherHandler()
                        : doubleClickProjectHandler()
                }
            >
                {orientador ? orientador?.name : '-'}
            </TableTd>
            <TableTd onDoubleClick={doubleClickClassHandler}>
                {project.class.name}
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
