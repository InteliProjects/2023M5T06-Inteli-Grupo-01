export default interface IMysqlQueryBuilder {
    escape(value: any): string;
    escapeId(value: any): string;
    normalizeFilters(conditions: IConditionInput): string;
    normalizeOrders(orders: IOrders): string;
    normalizePagination(pagination: IPagination): string;
}

export type IConditionInput = IConditionOperator | ICondition;

export type IOrders = IOrder[];

export type IPagination = {
    page: number;
    pageSize: number;
};

export interface IOrder {
    table?: string;
    field: string;
    order: IOrderOption;
}

export type IOrderOption = 'ASC' | 'DESC';

export interface IConditionOperator {
    $AND?: (ICondition | IConditionInput)[];
    $OR?: (ICondition | IConditionInput)[];
    $IN?: IInCondition;
    $LIKE?: IConditionString;
}

export interface ICondition {
    table?: string;
    field: string;
    value: string | null | number;
    dontEscape?: boolean;
}

export interface IInCondition {
    table?: string;
    field: string;
    value: (string | number | null)[];
    dontEscape?: boolean;
}

export interface IConditionString {
    table?: string;
    field: string;
    value: string;
    dontEscape?: boolean;
}
