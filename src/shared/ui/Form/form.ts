import block from '../../classComponents/Block';
import Input from '../Input/Input';
import templateForm from './formTemplate.hbs';
import './form.scss';

type TFormProps = {
    formTitle?: string,
    attr?: Record<string, string>,
    events?: Record<string, Function>
    items: Array<block>,
    buttons: Array<block>,
    classes?: string,
    controller?: Function,
}
type TProps = {
    [index: string]: any,
}
export default class Form extends block {
    controller: Function | null;

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

        if (props.controller) {
            this.controller = props.controller;
        }
    }

    getFormData(): void {
        const formData: Record<string, string> = {};

        Object.values(this.children).forEach((child) => {
            if (child instanceof Input) {
                formData[child.props.name] = String(child.currentValue);
            }
        });
        if (this.controller) {
            this.controller(formData);
        }
        // eslint-disable-next-line no-console
        console.log(formData);
    }

    resetForm() {
        Object.values(this.children).forEach((child) => {
            if (child instanceof Input) {
                child.reset();
            }
        });
    }

    render() {
        return this.compile(this.props);
    }
}
