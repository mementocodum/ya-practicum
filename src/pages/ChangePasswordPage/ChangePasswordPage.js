import * as cls from './ChangePasswordPage.module.scss';
import changePasswordPageTemplate from './ChangePasswordPageTemplate.hbs';

const data = {
    name: "Ivan",
    avatar: '',
    profileFields: [
        {
            label: "Старый пароль",
            value: "gobackyankee",
            name: "oldPassword",
        },
        {
            label: "Новый пароль",
            value: "gobackyankee",
            name: "newPassword",
        },
        {
            label: "Повторите новый пароль",
            value: "gobackyankee",
            name: "newPassword",
        },
    ],

    buttonLabel: 'Сохранить',
    canselButton: 'Отмена',

    classes: cls,
}

export const ChangePasswordPage = () => changePasswordPageTemplate(data);
