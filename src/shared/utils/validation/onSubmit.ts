import Form from "../../ui/Form/form";
import Block from "../../classComponents/block";
import Input from "../../ui/Input/input";
import {getConfirmField, validateFields} from "./validateFields";

export function onSubmit(self: Form, e: Event): void {
    e.preventDefault();
    if (!self.children) return;
    let send = true;
    Object.values(self.children).forEach((child: Block) => {
        if (child instanceof Input) {
            const error = validateFields(child.props.validation, String(child.currentValue), getConfirmField(self, child));
            if (error) send = false;
            child.setProps({
                error,
            });
        }
    });
    if (send) self.getFormData();
}
