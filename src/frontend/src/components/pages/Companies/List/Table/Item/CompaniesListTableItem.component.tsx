import TableTd from '../../../../../UI/Table/td/TableTd.component';
import ICompaniesListTableItem from './ICompaniesListTableItem.component';
import EditIcon from '../../../../../UI/SVG/Icons/EditICon';
import DeleteIcon from '../../../../../UI/SVG/Icons/DeleteIcon';

export default function CompaniesListTableItem({
    isEven = false,
    company,
    onDoubleClickCompany,
    onClickDelete,
    onClickEdit,
}: ICompaniesListTableItem) {
    function doubleClickCompanyHandler() {
        if (onDoubleClickCompany) {
            onDoubleClickCompany(company.id);
        }
    }

    function onClickDeleteHandler() {
        if (onClickDelete) {
            onClickDelete(company.id);
        }
    }

    function onClickUpdateHandler() {
        if (onClickEdit) {
            onClickEdit(company.id);
        }
    }

    return (
        <tr className={`${isEven ? 'bg-[#E5E7EB]' : ''}`}>
            <TableTd onDoubleClick={doubleClickCompanyHandler}>
                {company.id}
            </TableTd>
            <TableTd onDoubleClick={doubleClickCompanyHandler}>
                {company.name}
            </TableTd>
            <TableTd onDoubleClick={doubleClickCompanyHandler}>
                {company.email}
            </TableTd>
            <TableTd onDoubleClick={doubleClickCompanyHandler}>
                {company.size}
            </TableTd>
            <TableTd onDoubleClick={doubleClickCompanyHandler}>
                {company.sector}
            </TableTd>
            <TableTd onDoubleClick={doubleClickCompanyHandler}>
                {company.branch}
            </TableTd>
            <TableTd onDoubleClick={doubleClickCompanyHandler}>
                {company.activity}
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
