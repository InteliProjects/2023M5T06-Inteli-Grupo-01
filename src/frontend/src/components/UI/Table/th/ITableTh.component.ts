export default interface ITableTh {
    children?: any;
    onDoubleClick?: CallableFunction;
    name?: string;
    order?: 'ASC' | 'DESC' | null;
}

export interface IOrder {
    field: string;
    order: 'ASC' | 'DESC' | null;
}
