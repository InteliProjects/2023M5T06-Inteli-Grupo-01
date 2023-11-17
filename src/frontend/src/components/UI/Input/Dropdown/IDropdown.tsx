export default interface IDropdown {
    placeholder?: string;
    selected: string | null | number;
    onChange: CallableFunction;
    options: (IOption | string)[];
    label?: string;
    required?: boolean;
    state?: 'error' | 'disabled';
    complementText?: string;
}

export interface IOption {
    text: string;
    value: string | number;
}
