export default interface IRadio {
    label?: string;
    options: { text: string; value: string | number }[];
    initialValue?: string;
    selected?: string | number | null;
    onChange?: CallableFunction;
    state?: 'error' | 'disabled';
    complementText?: any;
    required?: boolean;
}
