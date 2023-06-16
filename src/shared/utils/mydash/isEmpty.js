export function isEmpty(value) {
    if(value === null || value === undefined || value === NaN) {
        return true;
    }

    if(typeof value === 'number'){
        return true;
    }

    if(typeof value === 'boolean') {
        return value;
    }

    if(!value.length && Array.isArray(value)) {
        return true;
    }

    if(value.toString() === '[object Set]' || value.toString() === '[object Map]'){
        return !value.size;
    }

    for(const el in value) {
        if (Object.prototype.hasOwnProperty(value, el)){
            return true;
        }
    }
    if(typeof value === 'string') {
        return !value.length;
    }

    return false;
}
