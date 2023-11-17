import { MouseEventHandler } from 'react';

export default interface ITableTd {
    children?: any;
    onDoubleClick?: MouseEventHandler<HTMLTableCellElement>;
}
