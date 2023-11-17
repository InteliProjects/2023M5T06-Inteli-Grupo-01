import IMysqlQueryBuilder, {
    ICondition,
    IConditionInput,
    IConditionOperator,
    IConditionString,
    IInCondition,
    IOrder,
    IOrders,
    IPagination,
} from './IMysqlQueryBuilder.connection';
import mysql from 'mysql';

export default class MysqlQueryBuilder implements IMysqlQueryBuilder {
    private defaultTable?: string;

    constructor(defaultTable?: string) {
        this.defaultTable = defaultTable;
    }

    escape(value: any): string {
        return mysql.escape(value);
    }

    escapeId(value: any): string {
        return mysql.escapeId(value);
    }

    normalizeFilters(condition: IConditionInput): string {
        if (Object.keys(condition).find((key) => key == 'field')) {
            return this.normalizeCondition(condition as ICondition);
        } else {
            condition = condition as IConditionOperator;

            if (condition.$AND) {
                return this.normalizeAndCondition(condition.$AND);
            } else if (condition.$OR) {
                return this.normalizeOrCondition(condition.$OR);
            } else if (condition.$IN) {
                return this.normalizeInCondition(condition.$IN);
            } else if (condition.$LIKE) {
                return this.normalizeLikeCondition(condition.$LIKE);
            } else {
                return '';
            }
        }
    }

    normalizeOrders(orders: IOrders): string {
        return orders.map((order) => this.normalizeOrder(order)).join(', ');
    }

    normalizePagination(pagination: IPagination): string {
        return `LIMIT ${pagination.pageSize} OFFSET ${(pagination.page - 1) * pagination.pageSize}`;
    }

    private normalizeOrder(order: IOrder): string {
        const tableName = order.table || this.defaultTable;
        return `${tableName ? `${this.escapeId(tableName)}.` : ''}${this.escapeId(order.field)} ${order.order}`;
    }

    private normalizeAndCondition(conditions: IConditionInput[]): string {
        return conditions.length
            ? `(${conditions.map((condition) => this.normalizeFilters(condition)).join(' AND ')})`
            : '';
    }

    private normalizeOrCondition(conditions: IConditionInput[]): string {
        return conditions.length
            ? `(${conditions.map((condition) => this.normalizeFilters(condition)).join(' OR ')})`
            : '';
    }

    private normalizeLikeCondition(condition: IConditionString) {
        const tableName = condition.table || this.defaultTable;
        return `${tableName ? `${this.escapeId(tableName)}.` : ''}${this.escapeId(condition.field)} LIKE ${
            condition.dontEscape ? condition.value : this.escape(condition.value)
        }`;
    }

    private normalizeInCondition(condition: IInCondition): string {
        const tableName = condition.table || this.defaultTable;
        return `${tableName ? `${this.escapeId(tableName)}.` : ''}${this.escapeId(
            condition.field,
        )} IN (${condition.value.map((val) => (condition.dontEscape ? val : this.escape(val))).join(', ')})`;
    }

    private normalizeCondition(condition: ICondition): string {
        const tableName = condition.table || this.defaultTable;
        return `${tableName ? `${this.escapeId(tableName)}.` : ''}${this.escapeId(condition.field)} = ${
            condition.dontEscape ? condition.value : this.escape(condition.value)
        }`;
    }
}
