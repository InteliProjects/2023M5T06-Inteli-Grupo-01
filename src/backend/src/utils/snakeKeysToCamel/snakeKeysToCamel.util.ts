import ApiError from '../../infra/config/apiError/ApiError.config';
import snakeToCamel from '../snakeToCamel/snakeToCamel.util';

export default function snakeKeysToCamel(input: any): any {
    if (Array.isArray(input)) {
        return input.map((inputObj) => snakeKeysToCamel(inputObj));
    } else if (typeof input == 'object' && input) {
        return transformSnakeKeysToCamel(input);
    } else if (typeof input == 'string') {
        return snakeToCamel(input);
    } else {
        throw new ApiError('Invalid Input type');
    }
}

function transformSnakeKeysToCamel(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const camelKey = snakeToCamel(key);
            if (typeof obj[key] == 'object' && obj[key] && !(obj[key] instanceof Date)) {
                result[camelKey] = snakeKeysToCamel(obj[key]);
            } else {
                result[camelKey] = obj[key];
            }
        }
    }
    return result;
}
