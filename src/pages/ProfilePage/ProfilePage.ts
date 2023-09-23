import './ProfilePage.scss';
import profilePageTemplate from './ProfilePageTemplate.hbs';
import Button from '../../shared/ui/Button/button';
import Input from '../../shared/ui/Input/Input';
import Block, { TProps } from '../../shared/classComponents/Block';
import avatarImg from '../../../static/Union.svg';
import AuthController from '../../app/controllers/AuthController';
import { State } from '../../shared/classComponents/Store';
import { resourcesUrl } from '../../shared/constants';
import { connect } from '../../shared/utils/connectHOC';
import UsersController from '../../app/controllers/UsersController';
import Form from '../../shared/ui/Form/form';
import {
    DISPLAY_NAME_REGEXP,
    EMAIL_REGEXP,
    FIRST_NAME_REGEXP,
    LOGIN_REGEXP, PASSWORD_REGEXP, PHONE_REGEXP,
    SECOND_NAME_REGEXP,
} from '../../shared/utils/validation/constants';
import { onFocus } from '../../shared/utils/validation/onFocus';
import { onBlur } from '../../shared/utils/validation/onBlur';
import { onSubmit } from '../../shared/utils/validation/onSubmit';

class ProfilePage extends Block {
    constructor() {
        const editProfileData = new Form({
            attr: {
                class: 'form',
            },
            controller: UsersController.changeProfileData.bind(UsersController),
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
                            this.showListProfileData();
                        },
                    },
                }),
            ],
        });

        const editProfilePassword = new Form({
            attr: {
                class: 'form',
            },
            controller: UsersController.changeProfilePassword.bind(UsersController),
            events: {
                focusin: onFocus,
                focusout: onBlur,
                submit: onSubmit,
            },
            items: [
                new Input({
                    ...inputDefaultProps,
                    name: 'oldPassword',
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
                    name: 'newPassword',
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
                    name: 'newPassword',
                    title: 'Повторите новый пароль',
                    placeholder: 'Повторите новый пароль',
                    required: true,
                    type: 'password',
                    validation: {
                        required: true,
                        confirm: 'newPassword',
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
                            this.showListProfileData();
                        },
                    },
                }),
            ],
        });

        const propsPage = {
            type: 'view',
            attr: {
                class: 'wrapper',
            },
            avatarImg,
            avatarUpload,
            editProfileData,
            editProfilePassword,
            buttons: [
                new Button({
                    attr: {
                        class: 'button',
                    },
                    text: 'Изменить данные',
                    events: {
                        click: () => {
                            this.showEditProfileForm();
                        },
                    },
                }),
                new Button({
                    attr: {
                        class: 'button',
                    },
                    text: 'Изменить пароль',
                    events: {
                        click: () => {
                            this.showEditPasswordForm();
                        },
                    },
                }),
                new Button({
                    attr: {
                        class: 'buttonOut',
                    },
                    text: 'Выйти',
                    events: {
                        click: AuthController.logout.bind(AuthController),
                    },
                }),
            ],
        };

        const { buttons } = propsPage;
        const props: TProps = {
            ...propsPage,
            buttons: '',
        };

        props.listDataProfile = {};

        buttons.forEach((item: Button) => {
            const id = item._id ?? '' as const;
            props[id] = item;
            props.buttons += `<div data-id="${id}"></div>`;
        });
        super('main', props, profilePageTemplate);
    }

    static mapStateToProps(state: State): TProps {
        let props = {};
        if (state?.user) {
            props = {
                listDataProfile: state.user,
                avatarImg: resourcesUrl + state.user.avatar ?? avatarImg,
            };
        }
        return props;
    }

    public componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {
        Object.values(this.children.editProfileData.children).forEach((item: unknown) => {
            if (item instanceof Input) {
                if (_newProps.listDataProfile[item.props.name]) {
                    item.setProps({
                        value: _newProps.listDataProfile[item.props.name],
                    });
                }
            }
        });
        this.showListProfileData();
        return true;
    }

    showListProfileData(): void {
        const listDataProfile = this.getContent().querySelector('.listFlex') as HTMLElement;
        listDataProfile.style.display = '';
        this.children.editProfileData.hide();
        this.children.editProfilePassword.hide();
        const profileButtons = this.getContent().querySelector('.profileFields') as HTMLElement;
        profileButtons.style.display = '';
    }

    showEditProfileForm(): void {
        const listDataProfile = this.getContent().querySelector('.listFlex') as HTMLElement;
        listDataProfile.style.display = 'none';
        this.children.editProfileData.show();
        this.children.editProfilePassword.hide();
        const profileButtons = this.getContent().querySelector('.profileFields') as HTMLElement;
        profileButtons.style.display = 'none';
    }

    showEditPasswordForm(): void {
        const listDataProfile = this.getContent().querySelector('.listFlex') as HTMLElement;
        listDataProfile.style.display = 'none';
        this.children.editProfileData.hide();
        this.children.editProfilePassword.show();
        const profileButtons = this.getContent().querySelector('.profileFields') as HTMLElement;
        profileButtons.style.display = 'none';
    }

    render() {
        return this.compile(this.props);
    }
}

const avatarUpload = new Input({
    type: 'file',
    name: 'avatar',
    title: 'Поменять аватар',
    attr: {
        class: 'avatarChange',
    },
    events: {
        change: changeAvatar,
    },
});

const inputDefaultProps = {
    attr: {
        class: 'label',
    },
    type: 'text',
    error: '',
};

export default connect(ProfilePage);

function changeAvatar(_self: Block, e: Event) {
    const data = new FormData();
    const elem = e.target as HTMLInputElement;
    if (elem.files) {
        data.append('avatar', elem.files?.[0]);
    }
    UsersController.changeProfileAvatar(data);
}
