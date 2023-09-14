import block from '../../classComponents/block';
import './input.scss';
import templateInput from './InputTemplate.hbs';

type TInput = {
    name?: string,
    label?: string,
    placeholder?: string,
    required?: boolean,
    type?: string,
    value?: string,
    attr?: Record<string, string>,
    validation?: TValidation,
    error?: string,
    [x: string]: unknown,
}

export type TValidation = {
    required?: boolean,
    confirm?: string,
    mask?: RegExp | null,
    minLength?: number,
    maxLength?: number,
    validationMessage?: string | null,
}

export default class Input extends block {
    currentValue: string | number | undefined;

    constructor(props: TInput) {
        super('label', props, templateInput);
        this.currentValue = props.value ?? '';
    }

    componentDidUpdate(oldProps: TInput, newProps: TInput): boolean {
        let update = false;
        Object.keys(newProps).forEach((key) => {
            if (oldProps[key] !== newProps[key]) {
                if (key === 'error') {
                    this.errorUpdate();
                } else {
                    update = true;
                }
                if (key === 'value') this.currentValue = newProps[key];
            }
        });
        return update;
    }

    setCurrentValue(self: Input, e: Event): void {
        const target = e?.target as HTMLInputElement;
        self.currentValue = target.value;
    }

    reset(): void {
        const element = this.getContent().querySelector('input') as HTMLInputElement | null;
        if (!element) return;
        element.value = '';
        this.currentValue = '';
    }

    _addEvents(): void {
        this.events.setCurrentValue = this.setCurrentValue.bind('', this);
        this._element.addEventListener('input', this.events.setCurrentValue);
        super._addEvents();
    }

    _removeEvents(): void {
        this._element.removeEventListener('input', this.events.setCurrentValue);
        super._removeEvents();
    }

    errorUpdate(): void {
        const errorBlock = this._element.querySelector('.error') ?? '';
        if (!errorBlock) return;
        errorBlock.textContent = this.props.error;
    }

    render() {
        return this.compile({ ...this.props, data_idc: this._id });
    }
}
