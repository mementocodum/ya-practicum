import { expect } from 'chai';
import Block from './Block';
import router from './Router';

describe('Router tests', () => {
    it('Router go', () => {
        router.go('/sign-up');
        expect(window.location.pathname).to.eq('/sign-up');
    });
    it('Router back', () => {
        router.go('/sign-up');
        router.go('/someroute');
        router.back();
        expect(window.history.length).to.eq(5);
    });
    it('Router use', () => {
        router.use('/test', Block);
        expect(router.getRoute('/test') !== undefined).to.be.true;
    });
});
