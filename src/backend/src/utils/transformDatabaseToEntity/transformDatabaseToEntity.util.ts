import ApiError from '../../infra/config/apiError/ApiError.config';

export function transformDatabaseToEntity(input: any): any {
    if (Array.isArray(input)) {
        return input.map((inputVal) => transformDatabaseToEntity(inputVal));
    } else if (typeof input == 'object' && input) {
        return transformObjDatabaseToEntity(input);
    } else {
        throw new ApiError('Invalid input type');
    }
}

function transformObjDatabaseToEntity(obj: any): any {
    const result: any = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const keys = key.split('_');

            let current = result;

            if (keys[keys.length - 1] === 'id') {
                for (let i = 0; i < keys.length; i++) {
                    const currentKey = keys[i];

                    if (i === keys.length - 1) {
                        current[currentKey] = value;
                    } else {
                        current[currentKey] = current[currentKey] || (current[currentKey] === null ? null : {});
                        current = current[currentKey];
                    }
                }
            } else {
                for (let i = 0; i < keys.length; i++) {
                    const currentKey = keys[i];
                    if (typeof current[currentKey] == 'undefined' || typeof current[currentKey] != 'object') {
                        current[keys.splice(i).join('_')] = value;
                        break;
                    } else {
                        current = current[currentKey];
                    }
                }
            }
        }
    }

    return result;
}
