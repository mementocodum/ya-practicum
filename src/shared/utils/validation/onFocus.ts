import Form from '../../ui/Form/form';
import { getValidData, validateFields } from './validateFields';

export function onFocus(self: Form, e: Event) {
    const [component, value = '', confirmValue] = getValidData(self, e);
    if (!component) return;
    const error = validateFields(component.props.validation, value, confirmValue);
    component.setProps({
        error,
    });
}
