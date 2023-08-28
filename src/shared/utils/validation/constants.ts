export const LOGIN_REGEXP: RegExp = /^[A-Za-z][A-Za-z1-9\-_]{2,19}$/;
export const PASSWORD_REGEXP: RegExp = /.*[A-ZА-Я1-9].*[A-ZА-Я1-9].*/;
export const EMAIL_REGEXP: RegExp = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
export const PHONE_REGEXP: RegExp = /^\+?\d{9,14}$/;
export const FIRST_NAME_REGEXP: RegExp = /^[A-ZА-Я]{1}[a-zа-я\-ъ]{0,254}$/;
export const SECOND_NAME_REGEXP: RegExp = /^[A-ZА-Я]{1}[a-zа-я\-ъ]{0,254}$/;
export const DISPLAY_NAME_REGEXP: RegExp = /^[1-9A-ZА-Яa-zа-я\-ъ]{0,254}$/;
