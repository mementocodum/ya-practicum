import * as cls from './NotFoundPage.module.scss'
import Block, {TProps} from "../../shared/classComponents/block";
import notFoundPageTemplate from "./NotFoundPageTemplate.hbs";

export default class ErrorPage extends Block {
    constructor(props: TProps, templator: Function) {
        super('main', props, templator);
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps) {
        return oldProps.errorCode !== newProps.errorCode || oldProps.errorText !== newProps.errorText;

    }

    render() {
        return this.compile(this.props);
    }
}

const error404 = new ErrorPage({
    attr: {
        class: cls.wrapper,
    },
    errorCode: 404,
    errorText: 'Не туда попали?',
    backBtn: 'Назад к чатам',
    classes: cls
}, notFoundPageTemplate);

export const NotFoundPage = () => error404.getContent();
