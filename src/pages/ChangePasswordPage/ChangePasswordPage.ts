import * as cls from './ChangePasswordPage.module.scss';
import profilePageTemplate from './ChangePasswordPageTemplate.hbs';
import Button from "../../shared/ui/Button/button";
import Input from "../../shared/ui/Input/input";
import {PASSWORD_REGEXP} from "../../shared/utils/validation/constants";
import {onSubmit} from "../../shared/utils/validation/onSubmit";
import {onBlur} from "../../shared/utils/validation/onBlur";
import {onFocus} from "../../shared/utils/validation/onFocus";
import Form from "../../shared/ui/Form/form";
import Block, {TProps} from "../../shared/classComponents/block";
import dataMock from '../../../static/exampleData.json';
import avatarImg from '../../../static/Union.svg'

const exampleProfileData = dataMock.exampleProfileData;

export default class ProfilePage extends Block {
    constructor(propsPage: TProps, templator: Function) {
        const { buttons } = propsPage;
        const props: TProps = {
            ...propsPage,
            buttons: '',
        };

        buttons.forEach((item: Button) => {
            const id = item._id ?? '';
            props[id] = item;
            props.buttons += `<div data-id="${id}"></div>`;
        });
        super('main', props, templator);
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
const formPassProfile = new Form({
    attr: {
        class: '',
    },
    events: {
        focusin: onFocus,
        focusout: onBlur,
        submit: onSubmit,
    },
    items: [
        new Input({
            ...inputDefaultProps,
            name: 'old_password',
            title: 'Старый пароль',
            placeholder: 'Старый пароль',
            required: true,
            type: 'password',
            validation: {
                required: true,
                mask: PASSWORD_REGEXP,
                minLength: 8,
                maxLength: 40,
                validationMessage: 'Неверный пароль',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'password',
            title: 'Новый пароль',
            placeholder: 'Новый пароль',
            required: true,
            type: 'password',
            validation: {
                required: true,
                mask: PASSWORD_REGEXP,
                minLength: 8,
                maxLength: 40,
                validationMessage: 'Пароль должен содержать одну заглавную букву и цифру',
            },
        }),
        new Input({
            attr: {
                class: 'label',
            },
            name: 'confirm_password',
            title: 'Повторите новый пароль',
            placeholder: 'Повторите новый пароль',
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
            attr: {
                class: 'button',
                type: 'submit',
            },
            text: 'Сохранить',
        }),
        new Button({
            attr: {
                class: 'button',
                type: 'button',
            },
            text: 'Отменить',
            events: {
                click: () => {
                    location.replace('/profile')
                },
            },
        }),
    ],
});


const profilePage = new ProfilePage({
    type: 'view',
    attr: {
        class: cls.wrapper,
    },
    classes: cls,
    avatarImg,
    data: exampleProfileData,
    formPassProfile,
    buttons: [
    ],
}, profilePageTemplate);

export const ChangePasswordPage = () => profilePage.getContent();
