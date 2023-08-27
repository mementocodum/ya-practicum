import * as cls from './EditProfilePage.module.scss';
import profilePageTemplate from './EditProfilePageTemplate.hbs';
import Button from '../../shared/ui/Button/button';
import Input from '../../shared/ui/Input/input';
import {
    DISPLAY_NAME_REGEXP,
    EMAIL_REGEXP,
    FIRST_NAME_REGEXP,
    LOGIN_REGEXP,
    PHONE_REGEXP,
    SECOND_NAME_REGEXP,
} from '../../shared/utils/validation/constants';
import { onSubmit } from '../../shared/utils/validation/onSubmit';
import { onBlur } from '../../shared/utils/validation/onBlur';
import { onFocus } from '../../shared/utils/validation/onFocus';
import Form from '../../shared/ui/Form/form';
import Block, { TProps } from '../../shared/classComponents/block';
import dataMock from '../../../static/exampleData.json';
import avatarImg from '../../../static/Union.svg';
import { TProfileElement } from '../ProfilePage/ProfilePage';

const exampleProfileData: Record<string, TProfileElement> = dataMock.exampleProfileData;

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
const formDataProfile = new Form({
    attr: {
        class: cls.form,
    },
    items: [
        new Input({
            ...inputDefaultProps,
            name: 'email',
            title: 'Почта',
            placeholder: 'Почта',
            required: true,
            validation: {
                required: true,
                mask: EMAIL_REGEXP,
                validationMessage: 'Почта введена неверно',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'login',
            title: 'Логин',
            placeholder: 'Логин',
            required: true,
            validation: {
                required: true,
                mask: LOGIN_REGEXP,
                minLength: 3,
                maxLength: 20,
                validationMessage: 'Логин должен содержать только буквы латиницы, без спецсимволов (кроме -,_)',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'first_name',
            title: 'Имя',
            placeholder: 'Имя',
            required: true,
            validation: {
                required: true,
                mask: FIRST_NAME_REGEXP,
                validationMessage: 'Поле должно состаять только из букв, первая заглавная',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'second_name',
            title: 'Фамилия',
            placeholder: 'Фамилия',
            required: true,
            validation: {
                required: true,
                mask: SECOND_NAME_REGEXP,
                validationMessage: 'Поле должно состаять только из букв, первая заглавная',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'display_name',
            title: 'Имя в чате',
            placeholder: 'Имя в чате',
            required: true,
            validation: {
                required: true,
                mask: DISPLAY_NAME_REGEXP,
                validationMessage: 'Поле не может содержать спецсимволы',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'phone',
            title: 'Телефон',
            placeholder: 'Телефон',
            // type: 'number',
            required: true,
            validation: {
                required: true,
                mask: PHONE_REGEXP,
                minLength: 10,
                maxLength: 15,
                validationMessage: 'Поле должно состоять только из цифр и может начинаться с +',
            },
        }),
    ],
    events: {
        focusin: onFocus,
        focusout: onBlur,
        submit: onSubmit,
    },
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
                    location.replace('/profile');
                },
            },
        }),
    ],
});
Object.values(formDataProfile.children).forEach((item: Block) => {
    if (item instanceof Input) {
        if (exampleProfileData[item.props.name].value) {
            item.setProps({
                value: exampleProfileData[item.props.name].value,
            });
        }
    }
});

const profilePage = new ProfilePage({
    type: 'view',
    attr: {
        class: cls.wrapper,
    },
    classes: cls,
    avatarImg,
    data: exampleProfileData,
    formDataProfile,
    buttons: [
    ],
}, profilePageTemplate);

export const EditProfilePage = () => profilePage.getContent();
