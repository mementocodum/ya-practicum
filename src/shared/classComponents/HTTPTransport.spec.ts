import sinonChai from "sinon-chai";
import {createSandbox, SinonStub} from "sinon";
import HTTPTransport from "./HTTPTransport";
import {expect, use} from "chai";

describe('Test HTTPTransport', () => {
    use(sinonChai);
    const sandbox = createSandbox();
    let transport: HTTPTransport;
    let request: SinonStub<any>;

    beforeEach(() => {
        transport = new HTTPTransport('');
        request = sandbox.stub(transport, 'request' as keyof typeof transport).callsFake(() => Promise.resolve());
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('test get method', () => {
        const url = 'testURL/get';

        transport.get(url);

        expect(request).calledWithMatch(url, {type: 'GET'});
    });

    it('test post method', () => {
        const url = 'testURL/post';
        const testOptions = {
            data: {
                login: 'admin',
                password: 'password',
            },
            timeout: 5000,
        };

        transport.post(url, testOptions);

        expect(request).calledWithMatch(url, { ...testOptions, type: 'POST' });
    });

    it('test put method', () => {
        const url = 'testURL/put';
        const testOptions = {
            data: {
                login: 'admin',
                password: 'password',
            },
            timeout: 5000,
        };

        transport.put(url, testOptions);

        expect(request).calledWithMatch(url, { ...testOptions, type: 'PUT' });
    });

    it('test delete method', () => {
        const url = 'testURL/delete';
        const testOptions = {
            data: {
                login: 'admin',
                password: 'password',
            },
            timeout: 5000,
        };

        transport.delete(url,testOptions);

        expect(request).calledWithMatch(url, { ...testOptions, type: 'DELETE' });
    });
});
