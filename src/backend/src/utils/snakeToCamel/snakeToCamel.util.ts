export default function snakeToCamel(str: string) {
    return str.replace(/_([a-z])/g, function (match, group) {
        return group.toUpperCase();
    });
}
