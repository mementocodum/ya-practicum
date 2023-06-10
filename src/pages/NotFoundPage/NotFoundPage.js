import * as cls from './NotFoundPage.module.scss'
import loginPageTemplate from './NotFoundPageTemplate.hbs'


const data = {
    errorCode: 404,
    errorText: 'Не туда попали?',
    backBtn: 'Назад к чатам',
    classes: cls
};

export const NotFoundPage = () => loginPageTemplate(data);
