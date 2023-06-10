import * as cls from './ServerErrorPage.module.scss'
import loginPageTemplate from './ServerErrorPageTemplate.hbs'


const data = {
    errorCode: 500,
    errorText: 'Мы уже чиним',
    backBtn: 'Назад к чатам',
    classes: cls
};

export const ServerErrorPage = () => loginPageTemplate(data);
