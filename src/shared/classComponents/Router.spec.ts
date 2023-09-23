import router from './Router.ts';
import Block from './Block.ts';
import {expect} from "chai";

describe('Router tests', () => {
    it('Router go', () => {
        router.go('/sign-up');
        expect(window.location.pathname).to.eq('/sign-up');
    });
    test('Router back', () => {
        router.go('/sign-up');
        setTimeout(() => {
            router.back();
            expect(window.location.pathname).to.eq('/');
        }, 3000);
    });
    test('Router use', () => {
        router.use('/test', Block);
        expect(router.getRoute('/test') !== undefined).to.be.true;
    });
});
