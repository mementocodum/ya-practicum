import * as cls from './RegistrationPage.module.scss';
import registrationPageTemplate from './RegistrationPageTemplate.hbs';
import Block from '../../shared/classComponents/Block';
import Form from '../../shared/ui/Form/form';
import { onFocus } from '../../shared/utils/validation/onFocus';
import { onBlur } from '../../shared/utils/validation/onBlur';
import { onSubmit } from '../../shared/utils/validation/onSubmit';
import Input from '../../shared/ui/Input/Input';
import {
    EMAIL_REGEXP,
    FIRST_NAME_REGEXP,
    LOGIN_REGEXP, PASSWORD_REGEXP, PHONE_REGEXP,
    SECOND_NAME_REGEXP,
} from '../../shared/utils/validation/constants';
import Button from '../../shared/ui/Button/button';
import Link from '../../shared/ui/Link/link';
import AuthController from '../../app/controllers/AuthController';
import { connect } from '../../shared/utils/connectHOC';

export default class RegPage extends Block {
    constructor() {
        const props = {
            classes: cls,
            form: pageForm,
        };

        super('main', props, registrationPageTemplate);
    }

    render() {
        return this.compile(this.props);
    }
}

const inputDefaultProps = {
    attr: {
        class: 'label',
    },
    type: 'text',
    error: '',
};

const pageForm = new Form({
    formTitle: 'Регистрация',
    attr: {
        class: cls.form,
        action: '',
    },
    controller: AuthController.createUser.bind(AuthController),
    events: {
        focusin: onFocus,
        focusout: onBlur,
        submit: onSubmit,
    },
    items: [
        new Input({
            ...inputDefaultProps,
            name: 'email',
            title: 'Почта',
            required: true,
            validation: {
                required: true,
                mask: EMAIL_REGEXP,
                validationMessage: 'Некорректный email',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'login',
            title: 'Логин',
            required: true,
            validation: {
                required: true,
                mask: LOGIN_REGEXP,
                minLength: 3,
                maxLength: 20,
                validationMessage: 'Логин должен состоять из английских букв или спецсимволов(-_)',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'first_name',
            title: 'Имя',
            required: true,
            validation: {
                required: true,
                mask: FIRST_NAME_REGEXP,
                validationMessage: 'Поле должно состоять только из букв, первая заглавная',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'second_name',
            title: 'Фамилия',
            required: true,
            validation: {
                required: true,
                mask: SECOND_NAME_REGEXP,
                validationMessage: 'Поле должно состоять только из букв, первая заглавная',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'phone',
            title: 'Телефон',
            type: 'phone',
            required: true,
            validation: {
                required: true,
                mask: PHONE_REGEXP,
                minLength: 10,
                maxLength: 15,
                validationMessage: 'Поле должно состоять только из цифр и может начинаться с +',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'password',
            title: 'Пароль',
            required: true,
            type: 'password',
            validation: {
                required: true,
                mask: PASSWORD_REGEXP,
                minLength: 8,
                maxLength: 40,
                validationMessage: 'Пароль должен содержать хотя бы одну заглавную букву и цифру',
            },
        }),
        new Input({
            attr: {
                class: 'label',
            },
            name: 'confirm_password',
            title: 'Повторите пароль',
            required: true,
            type: 'password',
            validation: {
                required: true,
                confirm: 'password',
                validationMessage: 'Пароли не совпадают',
            },
            error: '',
        }),
    ],
    buttons: [
        new Button({
            text: 'Зарегистрироваться',
            attr: {
                type: 'submit',
                class: 'button',
            },
        }),
        new Link({
            text: 'Войти',
            attr: {
                class: 'registerButton link',
                href: '/',
            },
        }),
    ],

});

export const RegistrationPage = () => connect(RegPage);
