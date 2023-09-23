import Block, { TProps } from '../../shared/classComponents/Block';
import Form from '../../shared/ui/Form/form';
import Input from '../../shared/ui/Input/Input';
import Button from '../../shared/ui/Button/button';
import DialogActive from '../../shared/ui/Dialogue/Dialogue';
import Link from '../../shared/ui/Link/link';
import chatTemplate from './ChatListPageTemplate.hbs';
import DialogsList from '../../shared/ui/DialogueList/DialogueList';
import './ChatListPage.scss';
import MessageController from '../../app/controllers/MessageController';
import ChatsController from '../../app/controllers/ChatsController';
import UsersController from '../../app/controllers/UsersController';
import SearchUsers from '../../shared/ui/SearchUsers/SearchUsers';
import { onSubmit } from '../../shared/utils/validation/onSubmit';

const { addNewChatUser, createChat } = ChatsController;
const { searchUsers } = UsersController;
const { sendMessage, getMessage } = MessageController;

export type TMessage = Record<string, string | number | null>;

export type TDialog = {
    avatar: string,
    dialog: Array<TMessage>,
    id: string,
    lastMsg: TMessage,
    newMsg: number,
    login: string
}

class ChatPage extends Block {
    activeDialog: TDialog | undefined;

    constructor() {
        const props = {
            attr: {
                class: '',
            },
            activeDialog,
            listDialog: new DialogsList(),
            profileLink,
            newChatBtn: newChatButton,
            searchDialog,
            events: {
                click: (_self: Block, e: Event) => {
                    const target = e?.target as HTMLElement;
                    const item = target.closest('.dialogs__item') as HTMLElement;
                    if (!item) return;
                    const active = item.dataset.dialogId ?? undefined;
                    MessageController.changeCurrentChat(active);
                },
            },
        };
        super('main', props, chatTemplate);
        ChatsController.getAllChats();
        setInterval(ChatsController.getAllChats, 20000);
    }

    public componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {
        if (_newProps.activeDialog !== _oldProps.activeDialog) {
            this.children.listDialog.setProps({
                activeDialog: _newProps.activeDialog,
            });
        }
        return true;
    }

    render() {
        return this.compile(this.props);
    }
}

const searchDialog = new SearchUsers({
    attr: {
        class: 'search-block',
    },
    items: null,
    events: {
        change: searchUsers,
        click: addNewChatUser.bind(ChatsController),
    },
});

const profileLink = new Link({
    attr: {
        href: '/settings',
        class: 'link',
    },
    text: 'Профиль >',
});

const newChatButton = new Button({
    attr: {
        class: 'button',
    },
    text: 'Создать новый чат',
    events: {
        click: () => {
            createChat.bind(ChatsController)(prompt('Введите название чата') as string);
        },
    },
});

export const activeDialog = new DialogActive({
    attr: {
        class: 'currentDialog',
    },
    newMessage: new Form({
        attr: {
            class: 'formCreateMessage',
        },
        controller: sendMessage.bind(MessageController),
        items: [
            new Input({
                type: 'file',
                name: 'inc',
                attr: {
                    class: 'clipButton',
                },
                validation: {
                    required: false,
                },
            }),
            new Input({
                attr: {
                    class: 'inputMessage',
                },
                validation: {
                    required: true,
                    minLength: 1,
                },
                name: 'message',
                placeholder: 'Сообщение',
            }),
        ],
        buttons: [new Button({
            attr: {
                class: 'sendMessage',
                type: 'control-submit',
            },
        })],
        events: {
            submit: (self: Form, e: Event) => {
                onSubmit(self, e);
                self.resetForm();
                self.getContent().focus();
            },
        },
    }),
    btn: new Button({
        attr: {
            class: 'buttonProfile',
        },
        events: {
            click: () => {
                if (!confirm('Вы собираетесь удалить текущий чат, продолжить?')) return;
                ChatsController.deleteChat.bind(ChatsController)();
            },
        },
    }),
    messages: [],
    events: {
        scroll: (_self: Block, e: Event) => {
            const elem = e?.target as HTMLElement;
            if (elem.scrollTop) return;
            getMessage.bind(MessageController)();
        },
    },
});

export default ChatPage;
