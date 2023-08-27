import {LoginPage} from "../../../pages/LoginPage/LoginPage.ts";
import {RegistrationPage} from "../../../pages/RegistrationPage/RegistrationPage.ts";
import {ProfileViewPage} from "../../../pages/ProfilePage/ProfilePage.ts";
import {EditProfilePage} from "../../../pages/EditProfilePage/EditProfilePage";
import {ChangePasswordPage} from "../../../pages/ChangePasswordPage/ChangePasswordPage.ts";
import {ChatListPage} from "../../../pages/ChatListPage/ChatListPage.ts";
import {NotFoundPage} from "../../../pages/NotFoundPage/NotFoundPage.ts";
import {ServerErrorPage} from "../../../pages/ServerErrorPage/ServerErrorPage.ts";

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
        element: ProfileViewPage,
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
    'not-found': {
        path: '/not-found',
        element: NotFoundPage,
    },
    error: {
        path: '/error',
        element: ServerErrorPage,
    }
}
