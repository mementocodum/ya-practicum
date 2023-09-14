import './src/app/styles/style.scss';
import AuthController from './src/app/controllers/AuthController';
import router, {
    AUTH, ERROR404, ERROR500, MESSENGER, SETTINGS, SIGNUP,
} from './src/shared/classComponents/Router';
import AuthPage from './src/pages/LoginPage/LoginPage';
import Store from './src/shared/classComponents/Store';
import RegPage from './src/pages/RegistrationPage/RegistrationPage';
import ProfilePage from './src/pages/ProfilePage/ProfilePage';
import ServerErrorPage from './src/pages/ServerErrorPage/ServerErrorPage';
import NotFoundPage from './src/pages/NotFoundPage/NotFoundPage';
import ChatPage from './src/pages/ChatListPage/ChatListPage';

export default function initApp() {
    AuthController.getUserInfo().then(() => {
        router
            .use(AUTH, AuthPage)
            .use(SIGNUP, RegPage)
            .use(MESSENGER, ChatPage)
            .use(SETTINGS, ProfilePage)
            .use(ERROR404, NotFoundPage)
            .use(ERROR500, ServerErrorPage)
            .start();
        Store.set('getPage', '');
    });
}
initApp();
