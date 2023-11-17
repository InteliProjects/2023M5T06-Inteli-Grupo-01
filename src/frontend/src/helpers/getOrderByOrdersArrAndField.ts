import { IOrder } from '../components/UI/Table/th/ITableTh.component';

export default function getOrderByOrdersArrAndField(
    field: string,
    orders: IOrder[]
) {
    return orders.find((order) => order.field == field)?.order;
}
