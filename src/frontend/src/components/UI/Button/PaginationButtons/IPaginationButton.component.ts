export default interface IPaginationButtons {
    total: number;
    pageSize: number;
    page: number;
    maxButtons?: number;
    onClick?: CallableFunction;
}
