import { useNavigate } from 'react-router-dom';
import Table from '../../../../UI/Table/Table.component';
import { ICompetencesListTable } from './ICompetencesListTable.component';
import CompetencesListTableItem from './Item/CompetencesListTableItem.component';
import { uuidv4 } from '../../../../../helpers/uuidv4';
import getOrderByOrdersArrAndField from '../../../../../helpers/getOrderByOrdersArrAndField';

export default function CompetencesListTable({
    competences = [],
    onDoubleClickHeaderColumn,
    orders = [],
    onClickEdit,
    onClickDelete,
}: ICompetencesListTable) {
    const navigate = useNavigate();

    function onDoubleClickCompetence(id: number) {
        navigate(`/competences/${id}/edit`);
    }

    function onClickEditHandler(id: number) {
        if (onClickEdit) {
            onClickEdit(id);
        } else {
            navigate(`/competences/${id}/edit`);
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
            {competences?.map((competence, index) => {
                return (
                    <CompetencesListTableItem
                        key={uuidv4()}
                        isEven={index % 2 === 0}
                        competence={competence}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEditHandler}
                        onDoubleClickCompetence={onDoubleClickCompetence}
                    />
                );
            })}
        </Table>
    );
}
