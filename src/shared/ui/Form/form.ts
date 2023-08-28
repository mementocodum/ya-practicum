import block from '../../classComponents/block';
import Input from '../Input/input';
import templateForm from './formTemplate.hbs';
import './form.scss';

type TFormProps = {
    formTitle?: string,
    attr?: Record<string, string>,
    events?: Record<string, Function>
    items: Array<block>,
    buttons: Array<block>,
    classes?: string,
}
type TProps = {
    [index: string]: any,
}
export default class Form extends block {
    constructor(formProps: TFormProps, templator: Function = templateForm) {
        const { buttons = [], items = [], ...propsOther } = formProps;
        const props: TProps = {
            ...propsOther,
            formItems: '',
            formButtons: '',
        };

        items.forEach((item) => {
            const id = item._id ?? '';
            props[id] = item;
            props.formItems += `<div data-id="${id}"></div>`;
        });
        buttons.forEach((item) => {
            const id = item._id ?? '';
            props[id] = item;
            props.formButtons += `<div data-id="${id}"></div>`;
        });

        super('form', props, templator);
    }

    getFormData(): void {
        const formData: Record<string, string> = {};

        Object.values(this.children).forEach((child) => {
            if (child instanceof Input) {
                formData[child.props.name] = String(child.currentValue);
            }
        });
        // eslint-disable-next-line no-console
        console.log(formData);
    }

    render() {
        return this.compile(this.props);
    }
}
