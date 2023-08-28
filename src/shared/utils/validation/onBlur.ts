import Form from '../../ui/Form/form';
import { getValidData, validateFields } from './validateFields';

export function onBlur(self: Form, e: Event): void {
    const [component, value = '', confirmValue] = getValidData(self, e);
    if (!component) return;
    const error = validateFields(component.props.validation, value, confirmValue);
    component.setProps({
        error,
    });
    component.setProps({
        error,
    });
}
