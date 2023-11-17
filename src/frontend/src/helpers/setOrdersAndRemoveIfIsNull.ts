import { IOrder } from '../services/omp/IOmp.service';

export default function setOrdersAndRemoveIfIsNull(
    order: 'ASC' | 'DESC' | null,
    name: string,
    orders: IOrder[],
    setOrders: CallableFunction
) {
    const newOrders = orders.filter((order) => order.field != name);

    if (order) {
        newOrders.push({ field: name, order });
    }

    setOrders(newOrders);
}
