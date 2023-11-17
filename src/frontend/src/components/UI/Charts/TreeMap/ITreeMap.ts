export interface ITreeMapData {
    name?: string;
    size?: number;
    realSize?: number;
    color?: string;
    children?: ITreeMapData[];
}

export default interface ITreeMap {
    data: ITreeMapData[];
    singularItemName: string;
    pluralItemName: string;
}
