export interface ICustomButton {
    active?: boolean;
    className?: string;
    children: any;
    onClick?: CallableFunction;
    type?: 'button' | 'submit' | 'reset';
}
