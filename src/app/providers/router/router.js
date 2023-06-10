import { routes } from './constants.js';

export const appRouter = () => {
    const path = location.pathname.slice(1) || 'login';
    const element = routes?.[path]?.element || routes['not-found'].element;
    document.getElementById('root').innerHTML = element();
}
