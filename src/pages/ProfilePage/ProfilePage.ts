import * as cls from './ProfilePage.module.scss';
import profilePageTemplate from './ProfilePageTemplate.hbs';
import Button from '../../shared/ui/Button/button';
import Input from '../../shared/ui/Input/input';
import Block, { TProps } from '../../shared/classComponents/block';
import dataMock from '../../../static/exampleData.json';
import List from '../../shared/ui/ULList/ULList';
import avatarImg from '../../../static/Union.svg';

const exampleProfileData = dataMock.exampleProfileData as unknown;

export type TProfileElement = {
    label: string,
    value: string | number
}
export default class ProfilePage extends Block {
    constructor(propsPage: TProps, templator: Function) {
        const { buttons, data } = propsPage;
        const props: TProps = {
            ...propsPage,
            buttons: '',
        };

        const prepDataArr = Object.values(data) as TProfileElement[];
        const dataListArray = prepDataArr.map((item: TProfileElement): string => `<span class="value">${item.label}</span><span class="value">${item.value}</span>`) ?? [];

        props.formDataProfile?.hide();
        props.formPassProfile?.hide();

        props.listDataProfile = new List({
            attr: {
                class: 'listFlex',
            },
            items: dataListArray,
        });

        buttons.forEach((item: Button) => {
            const id = item._id ?? '' as const;
            props[id] = item;
            props.buttons += `<div data-id="${id}"></div>`;
        });
        super('main', props, templator);
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
});

const profilePage = new ProfilePage({
    type: 'view',
    attr: {
        class: cls.wrapper,
    },
    classes: cls,
    avatarImg,
    avatarUpload,
    data: exampleProfileData,
    buttons: [
        new Button({
            attr: {
                class: 'button',
            },
            text: 'Изменить данные',
            events: {
                click: () => {
                    location.replace('/edit-profile');
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
                    location.replace('/change-password');
                },
            },
        }),
        new Button({
            attr: {
                class: 'button',
            },
            text: 'Выйти',
        }),
    ],
}, profilePageTemplate);

export const ProfileViewPage = () => profilePage.getContent();
