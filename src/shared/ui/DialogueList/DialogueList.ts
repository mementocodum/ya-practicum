import Block, {TProps} from "../../classComponents/block";
import dialogueListTemplate from './DialogueListTemplate.hbs';
import {TDialog} from "../../../pages/ChatListPage/ChatListPage";
import {sliceLastMessage} from "../../utils/messagePrefix";
import './DialogueList.scss';
import avatarMock from '../../../../static/Union.svg';

type TDialogItem = {
    avatar: string,
    dialogId: string,
    login: string,
    lastMessage: string,
    timeLastMessage: string,
    countNewMessage: string | number,
    itemClass: string,
}
export default class DialogsList extends Block {
    constructor(props: TProps) {
        super('div', props, dialogueListTemplate);
    }

    dialogListCompile(dialogs: Array<TDialog> = []): Array<TDialogItem> | [] {
        const compilesDialogs: Array<TDialogItem> | undefined = [];
        dialogs.forEach((item) => {
            compilesDialogs.push({
                avatar: item.avatar ? item.avatar : avatarMock,
                dialogId: item.id,
                login: item.login,
                lastMessage: sliceLastMessage(item.lastMsg.text, item.lastMsg.type),
                timeLastMessage: item.lastMsg.date,
                countNewMessage: item.newMsg,
                itemClass: item.id === this.props.active ? 'active' : '',
            });
        });
        return compilesDialogs;
    }

    render() {
        const dialogs = this.dialogListCompile(this.props.dialogs);
        return this.compile({ ...this.props, dialogs });
    }
}
