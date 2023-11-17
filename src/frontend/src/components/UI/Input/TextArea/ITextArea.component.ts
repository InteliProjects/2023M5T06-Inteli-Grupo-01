export default interface ITextArea {
    placeholder?: string;
    label?: string;
    state?: 'error' | 'disabled';
    complementText?: any;
    value?: string | number | null;
    onChange?: CallableFunction;
    required?: boolean;
}
