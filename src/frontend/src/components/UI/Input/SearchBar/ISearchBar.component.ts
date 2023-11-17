export interface ISearchBar {
    placeholder?: string;
    value?: string | number | null;
    onSubmit?: CallableFunction;
    onChange?: CallableFunction;
}
