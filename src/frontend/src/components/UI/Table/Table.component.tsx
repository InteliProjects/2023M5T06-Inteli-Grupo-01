import { uuidv4 } from '../../../helpers/uuidv4';
import ITable from './ITable.component';
import TableTh from './th/TableTh.component';

export default function Table({
    header,
    children,
    headerDefaultOnDoubleClick,
    className,
}: ITable) {
    return (
        <table className={className || 'w-full shadow-md'}>
            <thead className='sticky top-0 bg-red text-white'>
                <tr className=''>
                    {header?.map((element) => {
                        const isString = typeof element == 'string';

                        if (isString) {
                            return <TableTh key={uuidv4()}>{element}</TableTh>;
                        } else {
                            let onDoubleClick = undefined;

                            if (element.onDoubleClick) {
                                onDoubleClick = element.onDoubleClick;
                            } else {
                                onDoubleClick = element.field
                                    ? headerDefaultOnDoubleClick
                                    : undefined;
                            }

                            return (
                                <TableTh
                                    key={uuidv4()}
                                    name={element.field}
                                    onDoubleClick={onDoubleClick}
                                    order={element.order}
                                >
                                    {element.text}
                                </TableTh>
                            );
                        }
                    })}
                </tr>
            </thead>
            <tbody className=''>{children}</tbody>
        </table>
    );
}
