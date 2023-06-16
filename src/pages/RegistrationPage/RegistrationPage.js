import * as cls from './RegistrationPage.module.scss';
import registrationPageTemplate from './RegistrationPageTemplate.hbs';

const data = {
    headerText: 'Регистрация',
    fields: [
        {
            title: "Почта",
            name: "email",
            type: "text",
            errorText: "Некорректный email"
        },
        {
            title: "Логин",
            name: "login",
            type: "text",
        },
        {
            title: "Имя",
            name: "first_name",
            type: "text",
        },
        {
            title: "Фамилия",
            name: "second_name",
            type: "text",
        },
        {
            title: "Телефон",
            name: "phone",
            type: "tel",
            pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
            errorText: "Некорректный телефон"
        },
        {
            title: "Пароль",
            placeholder: "Введите пароль",
            name: "password",
            type: "password"
        },
        {
            title: "Пароль (ещё раз)",
            placeholder: "Введите пароль",
            name: "password",
            type: "password",
            errorText: "Пароли не совпадают"
        },
    ],

    registerText: "Зарегистрироваться",
    loginText: "Войти",
    classes: cls,
}

export const RegistrationPage = () => registrationPageTemplate(data);
