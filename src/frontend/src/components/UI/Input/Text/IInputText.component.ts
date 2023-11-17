export default interface IInputText {
    placeholder?: string;
    label?: string;
    icon?: any;
    state?: 'error' | 'disabled';
    complementText?: any;
    value?: string | number | null;
    onChange?: CallableFunction;
    required?: boolean;
    type?: 'text' | 'email' | 'url' | 'password';
}
