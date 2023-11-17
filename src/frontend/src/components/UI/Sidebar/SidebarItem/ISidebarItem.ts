export default interface ISidebarItem {
    link: string;
    text: string;
    icon?: React.ReactElement;
    active?: boolean;
    alternativeIcon?: React.ReactElement;
}
