/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */

type PlainObject<T = any> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject | string, rhs: PlainObject | string) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }
    if (typeof rhs !== 'string') {
        for (const [key, value] of Object.entries(lhs)) {
            const rightValue = rhs[key];
            if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
                if (isEqual(value, rightValue)) {
                    continue;
                }
                return false;
            }

            if (value !== rightValue) {
                return false;
            }
        }
    }
    return true;
}
