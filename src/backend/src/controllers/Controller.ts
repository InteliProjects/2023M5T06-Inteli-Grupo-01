import { Request, query } from 'express';
import { matchedData, validationResult } from 'express-validator';
import ApiError from '../infra/config/apiError/ApiError.config';
import {
    ICondition,
    IConditionInput,
    IOrders,
    IPagination,
} from '../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import { IFieldToSearch, IFieldsToSearch, IFiltersOptions } from './IController';
import camelToSnake from '../utils/camelToSnake/camelToSnake.util';

export default abstract class Controller {
    protected defaultPageSize: number;
    protected fieldsToIgnoreOnFilters: string[];
    protected fieldsToSearch: IFieldsToSearch;

    constructor(
        defaultPageSize: number = 30,
        fieldsToIgnoreOnFilters: string[] = [],
        fieldsToSearch: IFieldsToSearch = ['name', 'id'],
    ) {
        this.defaultPageSize = defaultPageSize;
        this.fieldsToIgnoreOnFilters = fieldsToIgnoreOnFilters;
        this.fieldsToSearch = fieldsToSearch;
    }

    protected matchData<T = any>(req: Request): T {
        const result = matchedData(req) as T;
        return result;
    }

    protected validationResult(req: Request) {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            throw new ApiError(result.array(), 400);
        }
    }

    protected validateAndMatch(req: Request<any, any, any>) {
        this.validationResult(req);
        return this.matchData(req);
    }

    protected getPaginationFromQueryParams(req: Request, defaultPageSize: number = this.defaultPageSize): IPagination {
        const pagination: IPagination = {
            page: Number(req.query.paginationPage) || 1,
            pageSize: Number(req.query.paginationPageSize) || defaultPageSize,
        };

        return pagination;
    }

    protected getOrdersFromQueryParams(req: Request): IOrders | undefined {
        const orders: IOrders = [];

        if (req.query.orderBy) {
            ((req.query.orderBy as string) || '').split(',').forEach((queryOrder) => {
                const queryOrderSplitted = queryOrder.split('-');

                const baseOfParams = camelToSnake(queryOrderSplitted[0]).split('_');

                orders.push({
                    table: baseOfParams[0] == 'omp' ? baseOfParams.slice(0, 2).join('_') : undefined,
                    field: baseOfParams[0] == 'omp' ? baseOfParams.slice(2).join('_') : baseOfParams.join('_'),
                    order: queryOrderSplitted[1].toUpperCase() == 'ASC' ? 'ASC' : 'DESC',
                });
            });
        }

        return orders.length ? orders : undefined;
    }

    protected getFiltersFromQueryParams(
        req: Request,
        options: IFiltersOptions = {
            fieldsToIgnore: this.fieldsToIgnoreOnFilters,
            fieldsToSearch: this.fieldsToSearch,
        },
    ): IConditionInput | undefined {
        const filters: IConditionInput = { $AND: [] };

        if (options) {
            if (req.query.search) {
                filters.$AND?.push({
                    $OR: options.fieldsToSearch.map((fieldToSearch) => {
                        return typeof fieldToSearch == 'object'
                            ? {
                                  $LIKE: {
                                      table: fieldToSearch.table,
                                      field: fieldToSearch.field,
                                      value: `%${req.query.search}%`,
                                  },
                              }
                            : { $LIKE: { field: fieldToSearch, value: `%${req.query.search}%` } };
                    }),
                });
            }
        }

        const fieldsToIgnore: string[] = options?.fieldsToIgnore || [];
        fieldsToIgnore.push(...['paginationPage', 'paginationPageSize', 'orderBy', 'search']);

        Object.entries(req.query || {})
            .filter((queryParamEntrie) => !fieldsToIgnore.includes(queryParamEntrie[0]))
            .forEach((queryParamEntrie) => {
                const baseOfParams = camelToSnake(queryParamEntrie[0]).split('_');
                filters.$AND?.push({
                    table: baseOfParams[0] == 'omp' ? baseOfParams.slice(0, 2).join('_') : undefined,
                    field: baseOfParams[0] == 'omp' ? baseOfParams.slice(2).join('_') : baseOfParams.join('_'),
                    value: queryParamEntrie[1] as string,
                });
            });

        return filters.$AND?.length ? filters : undefined;
    }

    protected getFiltersOrdersAndPagination(
        req: Request,
        fieldsToSearch: IFieldsToSearch = this.fieldsToSearch,
        fieldsToIgnore: string[] = this.fieldsToIgnoreOnFilters,
        defaultPageSize: number = this.defaultPageSize,
    ): { filters?: IConditionInput; orders?: IOrders; pagination: IPagination } {
        return {
            filters: this.getFiltersFromQueryParams(req, { fieldsToSearch, fieldsToIgnore }),
            orders: this.getOrdersFromQueryParams(req),
            pagination: this.getPaginationFromQueryParams(req, defaultPageSize),
        };
    }

    protected makeListJson(data: any, counts?: any, pagination?: IPagination) {
        return {
            ...(counts || {}),
            ...(pagination || {}),
            data,
        };
    }
}
