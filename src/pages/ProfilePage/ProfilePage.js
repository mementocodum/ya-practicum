import * as cls from './ProfilePage.module.scss';
import profilePageTemplate from './ProfilePageTemplate.hbs';

const data = {
    headerText: 'Регистрация',

    name: "Ivan",
    avatar: '',
    profileFields: [
        {
            label: "Почта",
            value: "pochta@yandex.ru",
        },
        {
            label: "Логин",
            value: "ivanivanov",
        },
        {
            label: "Имя",
            value: "Иван",
        },
        {
            label: "Фамилия",
            value: "Иванов",
        },
        {
            label: "Имя в чате",
            value: "Иван",
        },
        {
            label: "Телефон",
            value: "+7 (909) 967 30 30",
        },
    ],

    profileControls: [
        {
            routeTitle: 'Изменить данные',
            route: '/edit-profile',
        },
        {
            routeTitle: 'Изменить пароль',
            route: '/change-password',
        },
        {
            routeTitle: 'Выйти',
            route: '/login',
        },
    ],

    classes: cls,
}

export const ProfilePage = () => profilePageTemplate(data);
