import { uuidv4 } from '../../../../../../helpers/uuidv4';
import TableTd from '../../../../../UI/Table/td/TableTd.component';
import IInitiativesListTableItem from './IInitiativesListTableItem.component';
import EditIcon from '../../../../../UI/SVG/Icons/EditICon';
import DeleteIcon from '../../../../../UI/SVG/Icons/DeleteIcon';

export default function InitiativesListTableItem({
    isEven = false,
    initiative,
    onDoubleClickCompany,
    onDoubleClickInitiative,
    onDoubleClickModule,
    onClickDelete,
    onClickEdit,
}: IInitiativesListTableItem) {
    function doubleClickInitiativeHandler() {
        if (onDoubleClickInitiative) {
            onDoubleClickInitiative(initiative.id);
        }
    }
    function doubleClickCompanyHandler() {
        if (onDoubleClickCompany) {
            onDoubleClickCompany(initiative.company.id);
        }
    }
    function doubleClickModuleHandler() {
        if (onDoubleClickModule) {
            onDoubleClickModule(initiative.module.id);
        }
    }

    function onClickDeleteHandler() {
        if (onClickDelete) {
            onClickDelete(initiative.id);
        }
    }

    function onClickUpdateHandler() {
        if (onClickEdit) {
            onClickEdit(initiative.id);
        }
    }

    console.log(initiative.rank);
    return (
        <tr className={`${isEven ? 'bg-[#E5E7EB]' : ''}`}>
            <TableTd onDoubleClick={doubleClickInitiativeHandler}>
                {initiative.id}
            </TableTd>
            <TableTd onDoubleClick={doubleClickInitiativeHandler}>
                {initiative.status}
            </TableTd>
            <TableTd onDoubleClick={doubleClickCompanyHandler}>
                {initiative.company.name}
            </TableTd>
            <TableTd onDoubleClick={doubleClickInitiativeHandler}>
                {initiative.name}
            </TableTd>
            <TableTd onDoubleClick={doubleClickModuleHandler}>
                <span className='block'>Mod. {initiative.module.order}</span>
                <span>{initiative.module.course.name}</span>
            </TableTd>
            <TableTd onDoubleClick={doubleClickInitiativeHandler}>
                {initiative.rank ? (
                    <div className='flex flex-col'>
                        <span className='flex w-full justify-center text-lg font-semibold items-center'>
                            {initiative.rank}
                        </span>
                        {(initiative.competences as any[]).map((competence) => {
                            return (
                                <span
                                    className='flex text-xs justify-center'
                                    key={uuidv4()}
                                >
                                    ({competence.name}: {competence.value}/5)
                                </span>
                            );
                        })}
                    </div>
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
