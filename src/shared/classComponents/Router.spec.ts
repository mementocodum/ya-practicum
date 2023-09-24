import { expect } from 'chai';
import router from './Router';
import Block from './Block';

describe('Router tests', () => {
    it('Router go', () => {
        router.go('/sign-up');
        expect(window.location.pathname).to.eq('/sign-up');
    });
    it('Router back', () => {
        router.go('/sign-up');
        setTimeout(() => {
            router.back();
            expect(window.location.pathname).to.eq('/');
        }, 3000);
    });
    it('Router use', () => {
        router.use('/test', Block);
        expect(router.getRoute('/test') !== undefined).to.be.true;
    });
});
