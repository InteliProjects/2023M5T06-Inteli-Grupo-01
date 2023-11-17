export default interface IPaginationButton {
    text: string | number;
    active?: boolean;
    onClick?: CallableFunction;
}
