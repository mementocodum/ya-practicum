import Block from '../../classComponents/Block';

export function render(query: string | undefined, block: Block): void {
    const root = document.getElementById(query || 'root');
    if (root) {
        root.innerHTML = '';
        // eslint-disable-next-line new-cap
        root.append(block.getContent());
    }
}
