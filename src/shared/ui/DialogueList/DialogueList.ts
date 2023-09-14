import Block, { TProps } from '../../classComponents/Block';
import dialogueListTemplate from './DialogueListTemplate.hbs';
import { sliceLastMessage } from '../../utils/messagePrefix';
import './DialogueList.scss';
import avatarMock from '../../../../static/Union.svg';
import Store, { Chat, State } from '../../classComponents/Store';
import { connect } from '../../utils/connectHOC';
import { parseDateAndTime } from '../../utils/parseDateAndTime';

type TDialogItem = {
    avatar: string | null,
    id: number,
    title: string,
    last_message?: Record<string, string | number | unknown | any> | null,
    last_message_text?: string,
    last_message_time?: string,
    last_message_full_time?: Date;
    unread_count: number,
    itemClass: string,
}
class DialogsList extends Block {
    dialogs: Array<Chat> | [] = [];

    constructor() {
        super('div', {
            attr: {
                class: 'dialogs',
            },

        }, dialogueListTemplate);
    }

    static mapStateToProps(state: State): TProps {
        let props = {
        };
        if (state?.chats) {
            props = {
                dialogs: state.chats,
                activeDialog: state?.currentChat?.chat?.id,
            };
        }
        return props;
    }

    convertDialogsList(dialogs: Array<TDialogItem> = []): Array<TDialogItem> | [] {
        const compilesDialogs: Array<TDialogItem> | undefined = [];
        dialogs.forEach((item) => {
            const out = item?.last_message?.user?.login === Store.getState()?.user?.login;
            compilesDialogs.push({
                avatar: item.avatar ? item.avatar : avatarMock,
                id: item.id,
                title: item.title,
                last_message_text: sliceLastMessage(item?.last_message?.content, out),
                last_message_time: parseDateAndTime(item?.last_message?.time)?.time,
                last_message_full_time: new Date(item?.last_message?.time),
                unread_count: item.unread_count ?? 99,
                itemClass: item.id === this.props.activeDialog ? 'active' : '',
            });
        });
        return compilesDialogs?.sort((a, b) => {
            if (!a?.last_message_full_time || !b?.last_message_full_time) {
                return 1;
            }
            if (a?.last_message_full_time > b?.last_message_full_time) {
                return -1;
            } return 1;
        }) || [];
    }

    render() {
        const dialogs = this.convertDialogsList(this.props.dialogs);
        return this.compile({ ...this.props, dialogs });
    }
}

export default connect(DialogsList);
