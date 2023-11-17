export default interface ICustomTooltip {
    text: string;
    color?: string;
    icon?: any;
    width?: number | string;
    place?:
        | 'right'
        | 'right-start'
        | 'right-end'
        | 'left'
        | 'left-start'
        | 'left-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end'
        | 'top'
        | 'top-start'
        | 'top-end';
}
