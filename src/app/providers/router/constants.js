import {LoginPage} from "../../../pages/LoginPage/LoginPage.js";
import {RegistrationPage} from "../../../pages/RegistrationPage/RegistrationPage.js";
import {ProfilePage} from "../../../pages/ProfilePage/ProfilePage.js";
import {EditProfilePage} from "../../../pages/EditProfilePage/EditProfilePage";
import {ChangePasswordPage} from "../../../pages/ChangePasswordPage/ChangePasswordPage.js";
import {ChatListPage} from "../../../pages/ChatListPage/ChatListPage.js";
import {NotFoundPage} from "../../../pages/NotFoundPage/NotFoundPage.js";
import {ServerErrorPage} from "../../../pages/ServerErrorPage/ServerErrorPage.js";
import {ChatOpenedPage} from "../../../pages/ChatOpenedPagePage/ChatOpenedPage.js";

export const routes = {
    login: {
        path: '/login',
        element: LoginPage,
    },
    register: {
        path: '/register',
        element: RegistrationPage,
    },
    profile: {
        path: '/profile',
        element: ProfilePage,
    },
    'edit-profile': {
        path: '/edit-profile',
        element: EditProfilePage,
    },
    'change-password': {
        path: '/change-password',
        element: ChangePasswordPage,
    },
    'chats-list': {
        path: '/chats-list',
        element: ChatListPage,
    },
    'chats-page': {
        path: '/chats-list',
        element: ChatOpenedPage,
    },
    'not-found': {
        path: '/not-found',
        element: NotFoundPage,
    },
    error: {
        path: '/error',
        element: ServerErrorPage,
    }
}
