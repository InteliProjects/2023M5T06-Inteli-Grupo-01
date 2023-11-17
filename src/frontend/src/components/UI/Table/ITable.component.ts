import { ReactElement } from 'react';

export default interface ITable {
    header?: (IComplexHeader | string)[];
    headerDefaultOnDoubleClick?: CallableFunction;
    children?: ReactElement | ReactElement[];
    className?: string;
}

interface IComplexHeader {
    text: string;
    onDoubleClick?: CallableFunction;
    field?: string;
    order?: 'ASC' | 'DESC' | null;
}
