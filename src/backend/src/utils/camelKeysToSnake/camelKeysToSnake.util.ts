import ApiError from '../../infra/config/apiError/ApiError.config';
import camelToSnake from '../camelToSnake/camelToSnake.util';

export default function camelKeysToSnake(input: any): any {
    if (Array.isArray(input)) {
        return input.map((inputObj) => camelKeysToSnake(inputObj));
    } else if (typeof input == 'object' && input) {
        return transformCamelObjToSnake(input);
    } else if (typeof input == 'string') {
        return camelToSnake(input);
    } else {
        throw new ApiError('Invalid Input type');
    }
}

function transformCamelObjToSnake(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const camelKey = camelToSnake(key);
            if (typeof obj[key] == 'object' && obj[key] && !(obj[key] instanceof Date)) {
                result[camelKey] = camelKeysToSnake(obj[key]);
            } else {
                result[camelKey] = obj[key];
            }
        }
    }
    return result;
}
