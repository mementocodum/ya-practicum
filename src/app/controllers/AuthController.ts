import BaseController from './BaseController';
import { TOptionsData } from '../../shared/classComponents/HTTPTransport';
import authApi from '../../shared/api/AuthApi';
import { MESSENGER } from '../../shared/classComponents/router';

class AuthController extends BaseController {
    public async createUser(data: TOptionsData): Promise<void> {
        try {
            const { status, response } = await authApi.createUser(data);
            if (status === 200) {
                await this.getUserInfo();
            } else if (status === 500) {
                this.router.go('/500');
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async login(data: TOptionsData): Promise<void> {
        try {
            this.store.set('isLoading', true);
            const { status, response } = await authApi.login(data);
            if (status === 200) {
                this.store.set('auth', true);
                this.router.go(MESSENGER);
                await this.getUserInfo();
                this.store.set('isLoading', false);
            } else if (status === 500) {
                this.router.go('/500');
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async getUserInfo(): Promise<boolean> {
        try {
            const { status, response } = await authApi.getUser();
            if (status === 200 && response) {
                this.store.set('user', JSON.parse(response));
                this.store.set('auth', true);
                return true;
            }
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    public async logout(): Promise<void> {
        try {
            const { status, response } = await authApi.logout();
            if (status === 200) {
                this.store.setResetState();
                this.router.go('/');
            } else if (status === 500) {
                this.router.go('/500');
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            }
        } catch (e) {
            console.log('error authController: ', e);
        }
    }
}

export default new AuthController();
