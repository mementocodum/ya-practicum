/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */

export function searchObjInArray(array: Array<Record<string, string | number | unknown>>, key: string, value: string | number): Record<string, string | number> | undefined {
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (item[key] === value) {
            return cloneDeep(item);
        }
    }
    return undefined;
}

export function cloneDeep(obj: Record<string, unknown | any>): Record<string, unknown | any> {
    return (function _cloneDeep(item: any): Record<string, unknown | any> {
        if (item === null || typeof item !== 'object') {
            return item;
        }

        if (item instanceof Date) {
            return new Date(item.valueOf());
        }

        if (item instanceof Array) {
            const copy: any = [];

            item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

            return copy;
        }

        if (item instanceof Set) {
            const copy = new Set();

            item.forEach((v) => copy.add(_cloneDeep(v)));

            return copy;
        }

        if (item instanceof Map) {
            const copy = new Map();

            item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

            return copy;
        }

        if (item instanceof Object) {
            const copy: any = {};

            Object.getOwnPropertySymbols(item).forEach((s) => (copy[s] = _cloneDeep(item[s])));

            Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])));

            return copy;
        }

        throw new Error(`Unable to copy object: ${item}`);
    }(obj));
}
