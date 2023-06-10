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

        },
    ],
    classes: cls,
}

export const ChatListPage = () => profilePageTemplate(data);
