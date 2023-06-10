import * as cls from './LoginPage.module.scss'
import loginPageTemplate from './LoginPageTemplate.hbs'


const data = {
    headerText: "Вход",
    fields: [
        {
            title: "Логин",
            name: "login",
            type: "text",
            errorText: "Такого пользователя не существует"
        },

        {
            title: "Пароль",
            name: "password",
            type: "password",
            errorText: "Неверный пароль"
        }
    ],

    enterText: "Авторизоваться",
    registerText: "Нет аккаунта?",
    classes: cls
};

export const LoginPage = () => loginPageTemplate(data);
