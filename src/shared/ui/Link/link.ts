import './link.scss';
import Block, {TProps} from "../../classComponents/block";

export default class Link extends Block {
    constructor(props: TProps) {
        super('a', props);
    }

    render() {
        if (typeof this.props.text === 'string') return this.props.text;
        return '';
    }
}
