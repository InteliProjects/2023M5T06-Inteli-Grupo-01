import { useNavigate } from 'react-router-dom';
import Table from '../../../../UI/Table/Table.component';
import { IProjectsListTable } from './IProjectsListTable.component';
import ProjectsListTableItem from './Item/ProjectsListTableItem.component';
import { uuidv4 } from '../../../../../helpers/uuidv4';
import getOrderByOrdersArrAndField from '../../../../../helpers/getOrderByOrdersArrAndField';

export default function ProjectsListTable({
    projects = [],
    onDoubleClickHeaderColumn,
    orders = [],
    onClickEdit,
    onClickDelete,
}: IProjectsListTable) {
    const navigate = useNavigate();

    function onDoubleClickCompany(id: number) {
        navigate(`/companies/${id}/edit`);
    }

    function onDoubleClickProject(id: number) {
        navigate(`/projects/${id}/edit`);
    }

    function onDoubleClickModule(id: number) {
        navigate(`/modules/${id}/edit`);
    }

    function onDoubleClickClass(id: number) {
        navigate(`/classes/${id}`);
    }

    function onDoubleClickTeacher(id: number) {
        navigate(`/teachers/${id}/edit`);
    }

    function onClickEditHandler(id: number) {
        if (onClickEdit) {
            onClickEdit(id);
        } else {
            navigate(`/projects/${id}/edit`);
        }
    }

    const header = [
        { text: 'ID', field: 'id' },
        { text: 'Nome', field: 'name' },
        { text: 'Status', field: 'status' },
        { text: 'Empresa', field: 'ompCompanyName' },
        { text: 'Módulo', field: 'ompModuleName' },
        { text: 'Competências' },
        { text: 'Orientador' },
        { text: 'Turma', field: 'ompProjectName' },
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
            {projects?.map((project, index) => {
                return (
                    <ProjectsListTableItem
                        key={uuidv4()}
                        isEven={index % 2 === 0}
                        project={project}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEditHandler}
                        onDoubleClickCompany={onDoubleClickCompany}
                        onDoubleClickProject={onDoubleClickProject}
                        onDoubleClickModule={onDoubleClickModule}
                        onDoubleClickClass={onDoubleClickClass}
                        onDoubleClickTeacher={onDoubleClickTeacher}
                    />
                );
            })}
        </Table>
    );
}
