import * as cls from './ChatOpenedPage.module.scss';
import profilePageTemplate from './ChatOpenedPageTemplate.hbs';

const data = {
    folders: [
        {
            label: 'Личное',
        },
        {
            label: 'Новости',
        },
        {
            label: 'Работа',
        },
        {
            label: 'Мемы',
        }
    ],

    chats: [
        {
            userName: 'Андрей Раяновский',
            message: 'изображение',
            avatar: '',
            timeSent: '10:49',
            isSentByMe: false,
            badgeCount: '2',
        },
        {
            userName: 'Киноклуб',
            message: 'стикер',
            avatar: 'static/Theloopa.svg',
            timeSent: '10:49',
            isSentByMe: true,
            badgeCount: '',
        },
        {
            userName: "Илья",
            message: "Друзья, у меня для вас особенный выпуск новостей!...",
            avatar: "",
            timeSent: "15:12",
            isSentByMe: false,
            badgeCount: 4
        },
        {
            userName: "Вадим",
            message: "Круто!",
            avatar: "",
            chatDate: "Пт",
            isSentByMe: true,
            badgeCount: 4
        },
        {
            userName: "тет-а-теты",
            message: "И Human Interface Guidelines и Material Design рекомендуют...",
            avatar: "",
            timeSent: "Ср",
            isSentByMe: false,
            badgeCount: 0
        },
        {
            userName: "1, 2, 3",
            message: "Миллионы россиян ежедневно проводят десятки часов свое...",
            avatar: "",
            timeSent: "Пн",
            isSentByMe: false,
            badgeCount: 0
        },
        {
            userName: "Design Destroyer",
            message: "В 2008 году художник Jon Rafman начал собирать...",
            avatar: "",
            timeSent: "Пн",
            isSentByMe: false,
            badgeCount: 0
        },
        {
            userName: "Day.",
            message: "Так увлёкся работой по курсу, что совсем забыл его анонсир...",
            avatar: "",
            timeSent: "1 Мая 2020",
            isSentByMe: false,
            badgeCount: 0
        },
        {
            userName: "Стас Рогозин",
            message: "Можно или сегодня или завтра вечером.",
            avatar: "",
            timeSent: "12 Апр 2020",
            isSentByMe: false,
            badgeCount: 0
        }
    ],
    classes: cls,
}

export const ChatOpenedPage = () => profilePageTemplate(data);
