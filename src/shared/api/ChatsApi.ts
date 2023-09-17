import BaseAPI from './BaseApi';
import HTTPTransport, { TOptionsData } from '../classComponents/HTTPTransport';

class ChatsApi extends BaseAPI {
    public http = new HTTPTransport(`${this.baseUrl}/chats`);

    public getChats(): Promise<any> {
        return this.http.get('/');
    }

    public getToken(id: number): Promise<any> {
        return this.http.post(`/token/${id}`);
    }

    public createChat(title: string): Promise<any> {
        return this.http.post('/', {
            data: { title },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public addUsers(chatId: number, users: Array<number>): Promise<any> {
        return this.http.put('/users', {
            data: { chatId, users },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public deleteChat(data: TOptionsData): Promise<any> {
        return this.http.delete('/', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public deleteUsers(chatId: number, users: Array<number>): Promise<any> {
        return this.http.delete('/users', {
            data: { chatId, users },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public getChatUsers(chatId: number): Promise<any> {
        return this.http.get(`/${chatId}/users`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}
export default new ChatsApi();
