import TableTd from '../../../../../UI/Table/td/TableTd.component';
import ICompetencesListTableItem from './ICompetencesListTableItem.component';
import EditIcon from '../../../../../UI/SVG/Icons/EditICon';
import DeleteIcon from '../../../../../UI/SVG/Icons/DeleteIcon';

export default function CompetencesListTableItem({
    isEven = false,
    competence,
    onDoubleClickCompetence,
    onClickDelete,
    onClickEdit,
}: ICompetencesListTableItem) {
    function doubleClickCompetenceHandler() {
        if (onDoubleClickCompetence) {
            onDoubleClickCompetence(competence.id);
        }
    }

    function onClickDeleteHandler() {
        if (onClickDelete) {
            onClickDelete(competence.id);
        }
    }

    function onClickUpdateHandler() {
        if (onClickEdit) {
            onClickEdit(competence.id);
        }
    }

    return (
        <tr className={`${isEven ? 'bg-[#E5E7EB]' : ''}`}>
            <TableTd onDoubleClick={doubleClickCompetenceHandler}>
                {competence.id}
            </TableTd>
            <TableTd onDoubleClick={doubleClickCompetenceHandler}>
                {competence.name}
            </TableTd>
            <TableTd onDoubleClick={doubleClickCompetenceHandler}>
                {competence.description}
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
