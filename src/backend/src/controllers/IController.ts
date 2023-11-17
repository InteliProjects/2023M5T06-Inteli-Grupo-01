export default interface IController {}

export interface IFiltersOptions {
    fieldsToIgnore: string[];
    fieldsToSearch: IFieldsToSearch;
}

export type IFieldsToSearch = IFieldToSearch[];

export type IFieldToSearch =
    | {
          table?: string;
          field: string;
      }
    | string;
