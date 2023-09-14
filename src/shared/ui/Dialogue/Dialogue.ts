import Block, { TProps } from '../../classComponents/Block';
import dialogueTemplate from './DialogueTemplate.hbs';
import { TMessage } from '../../../pages/ChatListPage/ChatListPage';
import avatarMock from '../../../../static/Union.svg';
import './Dialogue.scss';
import Store, { Chat, State } from '../../classComponents/Store';
import { parseDateAndTime } from '../../utils/parseDateAndTime';
import { connect } from '../../utils/connectHOC';

class DialogActive extends Block {
    currentChat: any;

    // eslint-disable-next-line no-undef
    _dialogWindow: null | HTMLElement = null;

    static mapStateToProps(state: State): TProps {
        let props = {};
        if (state?.chats) {
            props = {
                currentChat: state?.currentChat?.chat,
                messages: state.currentChat.messages,
                scroll: state.currentChat.scroll,
                attr: {
                    class: `currentDialog${state.currentChat?.isLoading ? ' loading' : ' '}${state.currentChat?.isLoadingOldMsg ? ' loading-old-msg' : ''}`,
                },
            };
        }
        return props;
    }

    constructor(allProps: TProps) {
        const props: TProps = {
            ...allProps,
            messages: '',
            avatar: allProps.avatar ? allProps.avatar : avatarMock,
        };

        super('div', props, dialogueTemplate);
    }

    public scrollBottom(): void {
        this.getContent().scrollBy(0, this.getContent().scrollHeight + 100);
    }

    public scrollTop(): void {
        this.getContent().scrollBy(0, -document.body.scrollHeight);
    }

    public setProps = (nextProps: TProps): void => {
        if (!nextProps) {
            return;
        }

        const messages = this.formattedMessages(nextProps?.messages);

        const newProps = {
            ...nextProps,
            messages,
        };

        this._prevProps = { ...this.props };
        Object.assign(this.props, newProps);
    };

    // eslint-disable-next-line class-methods-use-this
    private formattedMessages(messages: Array<Record<string, string | number>>): Array<string | Chat> | [] {
        if (!messages) return [];
        const formattedMessages: (string | Chat)[] = [];
        let currentGroupDate = '00.00.0000';
        const currentUserId = Store.getState()?.user?.id;

        [...messages].reverse().forEach((item: TMessage) => {
            const timeMsg = item.time ?? '';
            const { date, time } = parseDateAndTime(timeMsg);
            if (currentGroupDate !== date) {
                currentGroupDate = date;
                formattedMessages.push({ dateGroup: date });
            }
            const msgType = currentUserId === item?.user_id ? 'out' : 'in';
            const msgClass = `message msg-${msgType} ${item.content ? 'msg-text' : ''} ${item?.file ? 'msg-media' : ''}`;

            formattedMessages.push({
                ...item,
                time,
                msgClass,
            });
        });
        return formattedMessages;
    }

    // eslint-disable-next-line no-undef
    render(): string | DocumentFragment {
        return this.compile(this.props);
    }
}
export default connect(DialogActive);
