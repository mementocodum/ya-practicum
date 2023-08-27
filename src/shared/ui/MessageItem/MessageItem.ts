import messageTemplate from './MessageTemplate.hbs';
import './MessageItem.scss';
import Block, {TProps} from "../../classComponents/block";

export default class Message extends Block {
    constructor(props: TProps) {
        super('div', props, messageTemplate);
    }

    render() {
        return this.compile(this.props);
    }
}
