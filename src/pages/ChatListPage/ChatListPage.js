import * as cls from './ChatListPage.module.scss';
import profilePageTemplate from './ChatListPageTemplate.hbs';

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
            message: '',
            avatar: '',
            timeSent: '',
            isSentByMe: true,
            badgeCount: '2',
        },
    ],
    classes: cls,
}

export const ChatListPage = () => profilePageTemplate(data);
