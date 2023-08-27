const QUERY_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

type TOptionsData = Record<string, string | number>
type TOptions = {
    headers?: Record<string, string>,
    data?: TOptionsData,
    type?: string,
    timeout?: number
}
type HTTPMethod = (url: string, options?: TOptions) => Promise<unknown>
type HTTPRequest = (url: string, options?: TOptions, timeout?: number) => Promise<unknown | void>

function queryStringify(data: TOptionsData): string {
    if (!(data instanceof Object)) {
        throw new Error('Дата не объект');
    }

    const keys = Object.keys(data).map((key) => `${key}=${data[key]}`).join('&');
    return keys ? `?${keys}` : '';
}

export default class HTTPTransport {
    static get: HTTPMethod = (url = '', options: TOptions = {}) => this.request(url, { ...options, type: QUERY_TYPE.GET }, options.timeout);

    static post: HTTPMethod = (url = '', options: TOptions = {}) => this.request(url, { ...options, type: QUERY_TYPE.POST }, options.timeout);

    static put: HTTPMethod = (url = '', options: TOptions = {}) => this.request(url, { ...options, type: QUERY_TYPE.PUT }, options.timeout);

    static delete: HTTPMethod = (url = '', options: TOptions = {}) => this.request(url, { ...options, type: QUERY_TYPE.DELETE }, options.timeout);

    static request: HTTPRequest = (url = '', options = {}, timeout = 10000): Promise<unknown | void> => {
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
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
