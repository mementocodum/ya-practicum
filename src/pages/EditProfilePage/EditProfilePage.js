import * as cls from './EditProfilePage.module.scss';
import profilePageTemplate from './EditProfilePageTemplate.hbs';

const data = {
    name: "Ivan",
    avatar: '',
    profileFields: [
        {
            label: "Почта",
            value: "pochta@yandex.ru",
            name: "email",
        },
        {
            label: "Логин",
            value: "ivanivanov",
            name: "login",
        },
        {
            label: "Имя",
            value: "Иван",
            name: "first_name",
        },
        {
            label: "Фамилия",
            value: "Иванов",
            name: "second_name",
        },
        {
            label: "Имя в чате",
            value: "Иван",
            name: "display_name",
        },
        {
            label: "Телефон",
            value: "+7 (909) 967 30 30",
            name: "phone",
        },
    ],

    buttonLabel: 'Сохранить',

    classes: cls,
}

export const EditProfilePage = () => profilePageTemplate(data);
