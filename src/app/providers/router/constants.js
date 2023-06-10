import {LoginPage} from "../../../pages/LoginPage/LoginPage.js";
import {RegistrationPage} from "../../../pages/RegistrationPage/RegistrationPage.js";
import {ProfilePage} from "../../../pages/ProfilePage/ProfilePage.js";
import {EditProfilePage} from "../../../pages/EditProfilePage/EditProfilePage";
import {ChangePasswordPage} from "../../../pages/ChangePasswordPage/ChangePasswordPage.js";
import {ChatListPage} from "../../../pages/ChatListPage/ChatListPage.js";

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
    'chat-list': {
        path: '/chat-list',
        element: ChatListPage,
    },
    notFound: {
        path: '/not-found',
        element: Element,
    }
}
