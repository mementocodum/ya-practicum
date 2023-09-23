/* eslint-disable no-shadow */
import EventBus from './EventBus';
import { set } from '../utils/myDash/set';

export enum StoreEvents {
    Updated = 'updated',
}
export type Chat = Record<string, number | string | unknown>

export type State = {
    auth: boolean,
    user: null | Record<string, string | number>,
    isLoading: false,
    getPage: string,
    chats: Array<Chat>,
    currentChat: {
        isLoading: boolean,
        isLoadingOldMsg: boolean,
        scroll: number,
        chat: null | Chat,
        messages: Array<Chat> | null,
        users: Array<any> | null,
    },
};

class Store extends EventBus {
    private state: State = {
        auth: false,
        user: null,
        isLoading: false,
        getPage: '/',
        chats: [],
        currentChat: {
            isLoading: false,
            isLoadingOldMsg: false,
            scroll: 0,
            chat: null,
            messages: null,
            users: null,
        },
    };

    public getState(): State {
        return this.state;
    }

    public set(path: string, value: unknown): void {
        try {
            set(this.state, path, value);
            this.emit(StoreEvents.Updated);
        } catch (e) {
            console.log(e);
        }
    }

    public setResetState(): void {
        try {
            this.state = {
                auth: false,
                user: null,
                isLoading: false,
                getPage: '/',
                chats: [],
                currentChat: {
                    isLoading: false,
                    isLoadingOldMsg: false,
                    scroll: 0,
                    chat: null,
                    messages: null,
                    users: null,
                },
            };
            this.emit(StoreEvents.Updated);
        } catch (e) {
            console.log(e);
        }
    }
}
export default new Store();
