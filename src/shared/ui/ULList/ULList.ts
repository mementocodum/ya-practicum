import './ULList.scss';
import Block, { TProps } from '../../classComponents/block';

export default class List extends Block {
    constructor(props: TProps) {
        super('ul', props);
    }

    render() {
        const fragment = document.createElement('template');
        const { items = [], attr = { class: '' } } = this.props;
        const className = attr.class ?? '';
        if (!items) return fragment.content;
        items.forEach((item: Record<string, unknown>) => {
            fragment.innerHTML += `<li class='${className}__li'>${item}</li>`;
        });
        return fragment.content;
    }
}
