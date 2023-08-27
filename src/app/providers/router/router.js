import { routes } from './constants.js';

export const appRouter = () => {
    const path = location.pathname.slice(1) || 'login';
    const element = routes?.[path]?.element || routes['not-found'].element;
    const root = document.getElementById('root');
    root.innerHTML = '';
    root.append(element());
}
