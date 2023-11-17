import TableTd from '../../../../../UI/Table/td/TableTd.component';
import IProtoonDoubleClickPrototypesListTableItem from './IPrototypesListTableItem.component';
import EditIcon from '../../../../../UI/SVG/Icons/EditICon';
import DeleteIcon from '../../../../../UI/SVG/Icons/DeleteIcon';

export default function ProtoonDoubleClickPrototypesListTableItem({
    isEven = false,
    prototype,
    onDoubleClickPrototype,
    onDoubleClickProject,
    onDoubleClickModule,
    onDoubleClickClass,
    onDoubleClickCompany,
    onClickDelete,
    onClickEdit,
}: IProtoonDoubleClickPrototypesListTableItem) {
    function doubleClickPrototypeHandler() {
        if (onDoubleClickPrototype) {
            onDoubleClickPrototype(prototype.id);
        }
    }

    function doubleClickProjectHandler() {
        if (onDoubleClickProject) {
            onDoubleClickProject(prototype.project.id);
        }
    }

    function doubleClickCompanyHandler() {
        if (onDoubleClickCompany) {
            onDoubleClickCompany(prototype.project.company.id);
        }
    }

    function doubleClickClassHandler() {
        if (onDoubleClickClass) {
            onDoubleClickClass(prototype.project.class.id);
        }
    }

    function doubleClickModuleHandler() {
        if (onDoubleClickModule) {
            onDoubleClickModule(prototype.project.module.id);
        }
    }

    function onClickDeleteHandler() {
        if (onClickDelete) {
            onClickDelete(prototype.id);
        }
    }

    function onClickUpdateHandler() {
        if (onClickEdit) {
            onClickEdit(prototype.id);
        }
    }

    return (
        <tr className={`${isEven ? 'bg-[#E5E7EB]' : ''}`}>
            <TableTd onDoubleClick={doubleClickPrototypeHandler}>
                {prototype.id}
            </TableTd>
            <TableTd onDoubleClick={doubleClickPrototypeHandler}>
                {prototype.name}
            </TableTd>
            <TableTd onDoubleClick={doubleClickPrototypeHandler}>
                {prototype.groupName}
            </TableTd>
            <TableTd onDoubleClick={doubleClickPrototypeHandler}>
                {prototype.githubLink ? (
                    <a href={prototype.githubLink} className='block my-1'>
                        Github
                    </a>
                ) : null}
                {prototype.deployLink ? (
                    <a href={prototype.deployLink} className='block my-1'>
                        Deploy
                    </a>
                ) : null}
            </TableTd>
            <TableTd onDoubleClick={doubleClickProjectHandler}>
                {prototype.project.projectName}
            </TableTd>
            <TableTd onDoubleClick={doubleClickModuleHandler}>
                <span className='block'>
                    {prototype.project.module.course.name}
                </span>
                <span className='block'>
                    Mod. {prototype.project.module.order}
                </span>
            </TableTd>
            <TableTd onDoubleClick={doubleClickCompanyHandler}>
                {prototype.project.company.name}
            </TableTd>
            <TableTd onDoubleClick={doubleClickClassHandler}>
                {prototype.project.class.name}
            </TableTd>
            <TableTd onDoubleClick={doubleClickClassHandler}>
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
