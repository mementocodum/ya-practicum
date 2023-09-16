const QUERY_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export type TOptionsData = Record<string, string | number | Array<string | number>>;
type TOptions = {
    headers?: Record<string, string>,
    data?: TOptionsData | FormData,
    type?: string,
    timeout?: number
}
type HTTPMethod = (url: string, options?: TOptions) => Promise<any>
type HTTPRequest = (url: string, options?: TOptions, timeout?: number) => Promise<unknown | void>

// eslint-disable-next-line no-undef
function queryStringify(data: TOptionsData | FormData): string {
    // eslint-disable-next-line no-undef
    if (data instanceof FormData) return '';
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export default class HTTPTransport {
    baseUrl: string = '';

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public get: HTTPMethod = (url = '', options: TOptions = {}) => this.request(this.baseUrl + url, { ...options, type: QUERY_TYPE.GET }, options.timeout);

    public post: HTTPMethod = (url = '', options: TOptions = {}) => this.request(this.baseUrl + url, { ...options, type: QUERY_TYPE.POST }, options.timeout);

    public put: HTTPMethod = (url = '', options: TOptions = {}) => this.request(this.baseUrl + url, { ...options, type: QUERY_TYPE.PUT }, options.timeout);

    public delete: HTTPMethod = (url = '', options: TOptions = {}) => this.request(this.baseUrl + url, { ...options, type: QUERY_TYPE.DELETE }, options.timeout);

    public request: HTTPRequest = (url = '', options = {}, timeout = 10000): Promise<unknown | void> => {
        const { headers = {}, type = QUERY_TYPE.GET, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const queryParams = type === QUERY_TYPE.GET;

            xhr.open(
                type,
                queryParams && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );
            xhr.withCredentials = true;
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (queryParams || !data) {
                xhr.send();
            } else {
                const sendData = data instanceof FormData ? data : JSON.stringify(data);
                xhr.send(sendData);
            }
        }).then((res: any): unknown => ({ ...res, response: JSON.parse(res.response), status: res.status }));
    };
}
