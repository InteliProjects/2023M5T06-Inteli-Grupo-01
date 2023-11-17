import { AxiosService } from '../AxiosService';
import { ICondition, IOrder, IPagination } from './IOmp.service';

export default abstract class OmpService extends AxiosService {
    constructor(prefix: string) {
        super(`http://localhost:3000/${prefix}`);
    }

    async create(data: any) {
        const response = await this.axios.post(``, data);
        return response.data;
    }

    async list(
        filters?: ICondition[],
        orders?: IOrder[],
        pagination?: IPagination
    ) {
        const stringfiedFiltersOrdersAndPagination =
            this.stringfyFiltersOrdersAndPagination(
                filters,
                orders,
                pagination
            );

        const response = await this.axios.get(
            `${
                stringfiedFiltersOrdersAndPagination
                    ? `?${stringfiedFiltersOrdersAndPagination}`
                    : ''
            }`
        );

        return response.data;
    }

    async getById(id: string | number) {
        const response = await this.axios.get(`/${id}`);
        return response.data;
    }

    async updateById(id: string | number, data: any) {
        const response = await this.axios.patch(`/${id}`, data);
        return response.data;
    }

    async deleteById(id: string | number) {
        const response = await this.axios.delete(`/${id}`);
        return response.data;
    }

    protected stringfyFiltersOrdersAndPagination(
        filters?: ICondition[],
        orders?: IOrder[],
        pagination?: IPagination
    ): string {
        const stringfiedFilters = this.stringfyFilters(filters);
        const stringfiedOrders = this.stringfyOrders(orders);
        const stringfiedPagination = this.stringfyPagination(pagination);

        const arr = [];

        if (stringfiedFilters) arr.push(stringfiedFilters);
        if (stringfiedOrders) arr.push(stringfiedOrders);
        if (stringfiedPagination) arr.push(stringfiedPagination);

        return arr.join('&');
    }

    protected stringfyFilters(filters?: ICondition[]): string {
        return filters
            ? filters
                  .map((filter) => {
                      return `${filter.field}=${filter.value}`;
                  })
                  .join('&')
            : '';
    }

    protected stringfyOrders(orders?: IOrder[]): string {
        if (!orders || !orders.length) {
            return '';
        }

        return `orderBy=${orders
            .map((order) => {
                return `${order.field}-${order.order}`;
            })
            .join(',')}`;
    }

    protected stringfyPagination(pagination?: IPagination): string {
        return pagination
            ? `${
                  pagination.page
                      ? `paginationPage=${pagination.page}${
                            pagination.pageSize
                                ? `&paginationPageSize=${pagination.pageSize}`
                                : ''
                        }`
                      : ''
              }`
            : '';
    }
}
