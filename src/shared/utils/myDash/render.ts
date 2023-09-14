import Block from '../../classComponents/Block';

export function render(query: string | undefined, block: Block): void {
    console.log(query, 'query');
    const root = document.getElementById('root');
    if (root) {
        root.innerHTML = '';
        // eslint-disable-next-line new-cap
        root.append(block.getContent());
    }
}
