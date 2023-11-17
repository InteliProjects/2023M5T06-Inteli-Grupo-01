export default function camelToSnake(str: string) {
    return str.replace(/([A-Z])/g, function (match) {
        return '_' + match.toLowerCase();
    });
}
