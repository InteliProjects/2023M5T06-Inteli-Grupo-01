export default interface ICompetencesListTableItem {
    isEven?: boolean;
    competence: any;
    onDoubleClickCompetence?: CallableFunction;
    onClickEdit?: CallableFunction;
    onClickDelete?: CallableFunction;
}
