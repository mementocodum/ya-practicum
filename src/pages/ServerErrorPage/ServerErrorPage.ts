import * as cls from './ServerErrorPage.module.scss';
import serverErrorPageTemplate from './ServerErrorPageTemplate.hbs';
import Block, { TProps } from '../../shared/classComponents/block';

class ErrorPage extends Block {
    constructor(props: TProps) {
        props = {
            attr: {
                class: cls.wrapper,
            },
            errorCode: 500,
            errorText: 'Мы уже чиним',
            backBtn: 'Назад к чатам',
            classes: cls,
        };
        super('main', props, serverErrorPageTemplate);
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps) {
        return oldProps.errorCode !== newProps.errorCode || oldProps.errorText !== newProps.errorText;
    }

    render() {
        return this.compile(this.props);
    }
}

export default ErrorPage;
