import ITableTh from './ITableTh.component';
import { TbSortDescending2, TbSortAscending2 } from 'react-icons/tb';

export default function TableTh({
    children,
    onDoubleClick,
    name,
    order = null,
}: ITableTh) {
    function doubleClickHandler() {
        if (onDoubleClick) {
            let newOrder = order;
            switch (order) {
                case null:
                    newOrder = 'DESC';
                    break;
                case 'DESC':
                    newOrder = 'ASC';
                    break;
                case 'ASC':
                    newOrder = null;
                    break;
            }

            onDoubleClick(newOrder, name, children);
        }
    }

    let orderByIcon = null;

    if (order === 'ASC') {
        orderByIcon = <TbSortAscending2 />;
    } else if (order === 'DESC') {
        orderByIcon = <TbSortDescending2 />;
    }

    return (
        <th className='border-x-[1px]' onClick={doubleClickHandler}>
            <div
                className={`w-full h-full flex justify-center items-center my-2 px-5 ${
                    onDoubleClick ? 'cursor-pointer' : ''
                }`}
            >
                <span className='w-full flex flex-nowrap justify-center items-center'>
                    <span className='text-wrap'>{children}</span>{' '}
                    {orderByIcon ? (
                        <span className='ml-2'>{orderByIcon}</span>
                    ) : null}
                </span>
            </div>
        </th>
    );
}
