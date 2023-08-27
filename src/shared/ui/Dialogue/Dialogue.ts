import Block, { TProps } from '../../classComponents/block';
import dialogueTemplate from './DialogueTemplate.hbs';
import Message from '../MessageItem/MessageItem';
import { TMessage } from '../../../pages/ChatListPage/ChatListPage';
import mediaMock from '../../../../static/goose.jpg';
import './Dialogue.scss';

export default class DialogActive extends Block {
    constructor(allProps: TProps) {
        const props: TProps = {
            ...allProps,
            messages: '',
            avatar: allProps.avatar ? allProps.avatar : '',
        };

        setGroupMsgToProps(props);

        super('div', props, dialogueTemplate);
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
        if (oldProps.dialog !== newProps.dialog) {
            const children = this.getChildren(newProps).children ?? {};
            this.children = {
                btn: this.children.btn,
                newMessage: this.children.newMessage,
                ...children,
            };
        }
        return true;
    }

    setProps = (nextProps: TProps): void => {
        if (!nextProps) {
            return;
        }
        this.prevProps = { ...this.props };
        const newProps = {
            ...this.props,
            ...nextProps,
            messages: '',
        };
        setGroupMsgToProps(newProps);
        Object.assign(this.props, newProps);
    };

    // eslint-disable-next-line no-undef
    render(): string | DocumentFragment {
        return this.compile(this.props);
    }
}

function setGroupMsgToProps(props: TProps = {}): void {
    let currentGroupDate = '00.00.0000';
    const dialog = props.dialog ?? [];
    dialog.forEach((item: TMessage) => {
        if (currentGroupDate !== item.date) {
            currentGroupDate = item.date;
            props.messages += `<div class="dialogDateItem">${item.date}</div>`;
        }
        const media = item.media ? mediaMock : '';
        const newMSG = new Message({
            ...item,
            media,
            attr: {
                class: `message msg-${item.type} ${item.text ? 'msg-text' : ''} ${item.media ? 'msg-media' : ''}`,
            },
        });
        const id = newMSG._id ?? '';
        props[id] = newMSG;
        props.messages += `<div data-id="${id}"></div>`;
    });
}
