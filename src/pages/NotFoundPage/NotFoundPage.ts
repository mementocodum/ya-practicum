import * as cls from './NotFoundPage.module.scss';
import Block, { TProps } from '../../shared/classComponents/Block';
import notFoundPageTemplate from './NotFoundPageTemplate.hbs';

class ErrorPage extends Block {
    constructor(props: TProps) {
        props = {
            ...props,
            attr: {
                class: cls.wrapper,
            },
            errorCode: 404,
            errorText: 'Не туда попали?',
            backBtn: 'Назад к чатам',
            classes: cls,
        };
        super('main', props, notFoundPageTemplate);
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps) {
        return oldProps.errorCode !== newProps.errorCode || oldProps.errorText !== newProps.errorText;
    }

    render() {
        return this.compile(this.props);
    }
}

export default ErrorPage;
