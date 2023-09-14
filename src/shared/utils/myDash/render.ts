import Block from '../../classComponents/block';

export function render(query: string, block: Block): void {
    const root = document.getElementById('root');
    if (root) {
        root.innerHTML = '';
        // eslint-disable-next-line new-cap
        root.append(block.getContent());
    }
}
