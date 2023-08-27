import * as cls from './ServerErrorPage.module.scss'
import serverErrorPageTemplate from './ServerErrorPageTemplate.hbs'
import Block, {TProps} from "../../shared/classComponents/block";

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

const error500 = new ErrorPage({
    attr: {
        class: cls.wrapper,
    },
    errorCode: 500,
    errorText: 'Мы уже чиним',
    backBtn: 'Назад к чатам',
    classes: cls,
}, serverErrorPageTemplate);

export const ServerErrorPage = () => error500.getContent();
