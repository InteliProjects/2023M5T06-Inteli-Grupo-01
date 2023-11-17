export default interface IInputNumber {
    placeholder?: string;
    label?: string;
    icon?: any;
    value?: string | number | null;
    onChange?: CallableFunction;
    state?: 'error' | 'disabled';
    complementText?: any;
    required?: boolean;
    min?: number;
    max?: number;
}
