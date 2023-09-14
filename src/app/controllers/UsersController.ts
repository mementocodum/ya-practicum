import BaseController from './BaseController';
import { TOptionsData } from '../../shared/classComponents/HTTPTransport';
import UsersApi from '../../shared/api/UsersApi';
import Block from '../../shared/classComponents/block';

class UsersController extends BaseController {
    public async changeProfileData(data: TOptionsData) {
        try {
            const { status, response } = await UsersApi.changeData(data);
            if (status === 200) {
                alert('Изменения в профиль внесены!');
                this.store.set('user', JSON.parse(response));
            } else if (status === 500) {
                this.router.go('/500');
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async changeProfilePassword(data: TOptionsData) {
        try {
            const { status, response } = await UsersApi.changePassword(data);
            if (status === 200) {
                // eslint-disable-next-line no-alert, no-undef
                alert('Пароль изменен!');
                this.store.set('', '');
            } else if (status === 500) {
                this.router.go('/500');
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            }
        } catch (e) {
            console.log(e);
        }
    }

    // eslint-disable-next-line no-undef
    public async changeProfileAvatar(file: FormData) {
        try {
            const { status, response } = await UsersApi.changeAvatar(file);
            if (status === 200) {
                this.store.set('user', JSON.parse(response));
            } else if (status === 500) {
                this.router.go('/500');
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async searchUsers(self: Block, value: string) {
        if (!value) {
            self.setProps({ items: null });
            return;
        }
        try {
            const { status, response } = await UsersApi.searchUser(value);
            if (status === 200) {
                self.setProps({ items: JSON.parse(response) });
            } else if (status === 500) {
                this.router.go('/500');
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default new UsersController();
