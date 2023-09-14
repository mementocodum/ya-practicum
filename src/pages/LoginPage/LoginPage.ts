import * as cls from './LoginPage.module.scss';
import loginPageTemplate from './LoginPageTemplate.hbs';
import Block, { TProps } from '../../shared/classComponents/block';
import Form from '../../shared/ui/Form/form';
import Input from '../../shared/ui/Input/input';
import Button from '../../shared/ui/Button/button';
import { LOGIN_REGEXP, PASSWORD_REGEXP } from '../../shared/utils/validation/constants';
import Link from '../../shared/ui/Link/link';
import { onFocus } from '../../shared/utils/validation/onFocus';
import { onBlur } from '../../shared/utils/validation/onBlur';
import { onSubmit } from '../../shared/utils/validation/onSubmit';
import { State } from '../../shared/classComponents/store';
import { connect } from '../../shared/utils/connectHOC';
import AuthController from '../../app/controllers/AuthController';

export default class AuthPage extends Block {
    constructor() {
        const props = {
            classes: cls,
            form: pageForm,
        };
        super('main', props, loginPageTemplate);
    }

    static mapStateToProps(state: State) {
        let props = {
        };
        if (state?.chats) {
            props = {
                attr: {
                    class: `app__auth-page ${state?.isLoading ? 'loading' : ''} ${state.currentChat?.isLoadingOldMsg ? 'loadingOldMsg' : ''}`,
                },
            };
        }
        return props;
    }

    render() {
        return this.compile(this.props);
    }
}

const pageForm = new Form({
    formTitle: 'Вход',
    attr: {
        class: cls.form,
        action: '',
    },
    controller: AuthController.login.bind(AuthController),
    events: {
        focusin: onFocus,
        focusout: onBlur,
        submit: onSubmit,
    },
    items: [
        new Input({
            attr: {
                class: 'label',
            },
            name: 'login',
            title: 'Логин',
            type: 'text',
            error: '',
            required: true,
            validation: {
                required: true,
                maxLength: 20,
                minLength: 3,
                mask: LOGIN_REGEXP,
                validationMessage: 'Логин должен состоять из английских букв или спецсимволов(-_)',
            },
        }),
        new Input({
            attr: {
                class: 'label',
            },
            name: 'password',
            title: 'Пароль',
            type: 'password',
            error: '',
            required: true,
            validation: {
                required: true,
                maxLength: 40,
                minLength: 8,
                mask: PASSWORD_REGEXP,
                validationMessage: 'Неверный логин или пароль',
            },
        }),
    ],
    buttons: [
        new Button({
            text: 'Авторизоваться',
            attr: {
                type: 'submit',
                class: 'button',
            },
        }),
        new Link({
            text: 'Нет аккаунта?',
            attr: {
                class: 'registerButton link',
                href: '/sign-up',
            },
        }),
    ],

});

export const LoginPage = () => connect(AuthPage);
