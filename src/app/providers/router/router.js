import { routes } from './constants.js';

export const appRouter = () => {
    const path = location.pathname.slice(1) || 'login';
    const element = routes?.[path].element || routes.notFound.element;
    document.getElementById('root').innerHTML = element();
}
