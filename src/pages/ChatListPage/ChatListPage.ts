import Block, {TProps} from "../../shared/classComponents/block";
import avatarDefault from '../../../static/Union.svg';
import Form from "../../shared/ui/Form/form";
import Input from "../../shared/ui/Input/input";
import Button from "../../shared/ui/Button/button";
import {onSubmit} from "../../shared/utils/validation/onSubmit";
import DialogActive from "../../shared/ui/Dialogue/Dialogue";
import Link from "../../shared/ui/Link/link";
import chatTemplate from './ChatListPageTemplate.hbs';
import DialogsList from "../../shared/ui/DialogueList/DialogueList";
import chatData from '../../../static/exampleData.json';
import './ChatListPage.scss';

export const formattedDate = (inDate: string, inTime: string = '00:00'): Date => {
    const date: Array<string> = inDate.split('.');
    const time: Array<string> = inTime.split(':');
    const day: number = Number(date[0]);
    const month: number = Number(date[1]) - 1;
    const year: number = Number(date[2]);
    const hours: number = Number(time[0]);
    const minutes: number = Number(time[1]);
    return new Date(year, month, day, hours, minutes, 0);
};

const exampleChatData = chatData.exampleChatData as TDialog[];

export type TMessage = {
    date: string,
    media: string,
    new: boolean,
    read: boolean,
    text: string,
    time: string,
    type: string,
};

export type TDialog = {
    avatar: string,
    dialog: Array<TMessage>,
    id: string,
    lastMsg: TMessage,
    newMsg: number,
    login: string
}


export default class ChatPage extends Block {
    activeDialog: TDialog | undefined;

    constructor(props: TProps, templator: Function) {
        super('main', props, templator);
    }

    static selectDialog(self: ChatPage, e: Event): void {
        const target = e?.target as HTMLElement;
        const item = target.closest('.dialogs__item') as HTMLElement;
        if (!item) return;
        const active = item.dataset.dialogId ?? undefined;
        const dialog = self.searchActiveDialog(active);

        if (!active || !dialog) return;
        self.children.listDialog.setProps({
            active,
        });
        self.children.activeDialog.setProps({
            ...dialog,
            messages: '',
            avatar: dialog.avatar ? dialog.avatar : avatarDefault,
        });
    }

    static sortedDialogs(dialogs: Array<TDialog> = []): Array<TDialog> | [] {
        const sortedDialogs = [...dialogs] ?? [];
        if (!sortedDialogs) return [];
        sortedDialogs.forEach((item) => {
            item.dialog.sort((msg1, msg2) => (formattedDate(msg1.date, msg1.time).getTime() > formattedDate(msg2.date, msg2.time).getTime() ? 1 : -1));
            item.newMsg = 0;
            item.dialog.forEach((msg) => (msg.new ? item.newMsg++ : 0));
            item.lastMsg = item.dialog[item.dialog.length - 1];
        });
        sortedDialogs.sort((dialog1, dialog2) => (formattedDate(dialog1.lastMsg.date, dialog1.lastMsg.time).getTime() < formattedDate(dialog2.lastMsg.date, dialog2.lastMsg.time).getTime() ? 1 : -1));
        return sortedDialogs;
    }


    // eslint-disable-next-line class-methods-use-this
    searchActiveDialog(active: string | undefined): TDialog | undefined {
        for (let i = 0; i < exampleChatData.length; i++) {
            const item = exampleChatData[i];
            if (item.id === active) {
                return item as TDialog;
            }
        }
        return undefined;
    }

    static createNewMessage(): Form {
        return new Form({
            attr: {
                class: 'formCreateMessage',
            },
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
                    name: 'messagе',
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
                submit: onSubmit,
            },
        });
    }

    render() {
        return this.compile(this.props);
    }
}


const searchDialog = new Input({
    attr: {
        class: 'search',
    },
    placeholder: 'Поиск',
    type: 'search',
});

const profileLink = new Link({
    attr: {
        href: '/profile',
        class: 'link',
    },
    text: 'Профиль >',
});

const dialogsList = new DialogsList({
    attr: {
        class: 'dialogs',
    },
    dialogs: ChatPage.sortedDialogs(exampleChatData),
});

const activeDialog = new DialogActive({
    attr: {
        class: 'currentDialog',
    },
    newMessage: ChatPage.createNewMessage(),
    btn: new Button({
        attr: {
            class: 'buttonProfile',
        },
    }),
});


const chatPage = new ChatPage({
    attr: {
        class: '',
    },
    activeDialog,
    listDialog: dialogsList,
    profileLink,
    searchDialog,
    events: {
        click: ChatPage.selectDialog,
    },
}, chatTemplate);

export const ChatListPage = () => chatPage.getContent();
