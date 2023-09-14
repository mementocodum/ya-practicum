import Input, { TValidation } from '../../ui/Input/Input';
import Form from '../../ui/Form/form';
import Block from '../../classComponents/Block';

export function validateFields(validData: TValidation = {}, value: string | number, confirmValue?: string | undefined): string {
    let error = '';
    // eslint-disable-next-line no-param-reassign
    value = String(value);
    const {
        required = false, minLength = 0, maxLength = 9999, mask = null, validationMessage = '',
    } = validData;

    if (confirmValue !== undefined && (confirmValue !== value)) {
        return `Ошибка заполнения! ${validationMessage}`;
    }
    if (required && !value) {
        error = 'Это обязательное поле';
    }
    if (mask && !mask.test(value)) {
        error = `Ошибка заполнения! ${validationMessage}`;
    }
    if ((value.length > maxLength || value.length < minLength)) {
        error = `Это поле должно быть длиной от ${minLength} до ${maxLength} символов`;
    }
    if (!required && !value) error = '';
    return error;
}

export function getConfirmField(self: Form, component: Input): string | undefined {
    if (!component.props.validation.confirm) return undefined;
    // eslint-disable-next-line no-undef
    const confirmElement = self.getContent().querySelector(`[name=${component.props.validation.confirm}]`) as HTMLInputElement;
    const confirmValue = confirmElement.value ?? '';
    return confirmValue;
}

export function getValidData(self: Form, e: Event): [Block, string, string | undefined] | [] {
    // eslint-disable-next-line no-undef
    const target = e?.target as HTMLInputElement;
    const value = target?.value;
    const id = target?.dataset.idc;
    if (!id) return [];
    const component = self.children[id];
    return [component, value, getConfirmField(self, component)];
}
