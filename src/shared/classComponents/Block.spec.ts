import Block, {TProps} from "./Block";
import {expect} from "chai";

class TestBlock extends Block {
    constructor(props: TProps | undefined) {
        super('div', props);
    }

    render() {
        return this.props.text;
    }
}

const testChildren = new TestBlock({ text: 'child' });

describe('sum module', () => {
    it('Create components test', () => {
        const testBlock = new TestBlock({ text: 'test text' });
        expect(testBlock.getContent().outerHTML).to.be.eq('<div>test text</div>');
    });
    it('Create components attributes test', () => {
        const testBlock = new TestBlock({ attr: { class: 'testClass' } });
        expect(testBlock.getContent().className).to.eq('testClass');
    });
    it('componentDidUpdate method test', () => {
        const testBlock = new Block('div');
        expect(testBlock.componentDidUpdate({}, { attr: { class: 'testClass' } })).to.be.true;
    });
    it('addEvents test', () => {
        const testBlock = new TestBlock({
            events: {
                click: () => 'test',
            },
        });
        expect(testBlock.events.click !== undefined).to.be.true;
    });

    it('Add Children test', () => {
        const testBlock = new TestBlock({
            innerBlock: testChildren,
        });
        expect(testBlock.children.innerBlock.getContent().innerHTML).to.eq('child');
    });
});
