export default interface IOmpService {}

export interface ICondition {
    field: string;
    value: string | number | null;
}

export interface IOrder {
    field: string;
    order: 'ASC' | 'DESC';
}

export interface IPagination {
    page: number;
    pageSize: number;
}
