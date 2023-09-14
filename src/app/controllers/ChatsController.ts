import BaseController from './BaseController';
import Store from '../../shared/classComponents/store';
import ChatsApi from '../../shared/api/ChatsApi';
import MessageController from './MessageController';

class ChatsController extends BaseController {
    public async getAllChats(): Promise<void> {
        try {
            if (this.router?._currentRoute?._pathname !== '/messenger') return;
            const { status, response } = await ChatsApi.getChats();
            if (status === 200) {
                Store.set('chats', JSON.parse(response));
            } else if (status === 500) {
                this.router.go('/500');
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async createChat(title: string): Promise<boolean | number> {
        if (!title) return false;
        try {
            const { status, response } = await ChatsApi.createChat(title);
            if (status === 200) {
                const chatId = JSON.parse(response)?.id;
                await this.getAllChats();
                MessageController.changeCurrentChat(chatId);
                return chatId;
            } if (status === 500) {
                this.router.go('/500');
                return false;
            }
            alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    public async deleteChat(): Promise<void> {
        try {
            const chatId = this?.store?.getState()?.currentChat?.chat?.id;
            if (typeof chatId !== 'number') return;
            const { status, response } = await ChatsApi.deleteChat({ chatId });
            if (status === 200) {
                this.getAllChats();
                this.store.set('currentChat', {
                    isLoading: false,
                    isLoadingOldMsg: false,
                    scroll: 0,
                    chat: null,
                    messages: null,
                });
            } else if (status === 500) {
                this.router.go('/500');
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async addUser(id: number, user: number): Promise<boolean> {
        if (!id || !user) return false;
        try {
            const { status, response } = await ChatsApi.addUsers(id, [user]);
            if (status === 200) {
                return true;
            } if (status === 500) {
                this.router.go('/500');
                return false;
            }
            alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            return false;
        } catch (e) {
            console.log(e);
        }
        return false;
    }

    public async addNewChatUser(user: Record<string, string | number>): Promise<boolean | void> {
        const { display_name, login, id } = user;
        let chat = this?.store?.getState()?.currentChat?.chat?.id;
        if (!confirm(`Вы хотите ${chat ? 'добавить в текущий чат ' : 'создать новый чат с '}${login}`)) {
            return;
        }
        if (!chat) {
            const title = display_name ?? login;
            chat = await this.createChat(String(title));
            return;
        }
        if (!chat) return;
        return await this.addUser(Number(chat), Number(id));
    }
}

export default new ChatsController();
