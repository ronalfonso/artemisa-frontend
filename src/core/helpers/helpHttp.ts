export const helpHttp = () => {
    const customFetch = (url: string, options: any) => {
        const defaultHeader = {
            accept: "application/json",
           "Content-Type": "application/json"
        };

        const controller = new AbortController();
        options.signal = controller.signal;

        options.method = options.method || 'GET';
        options.headers = options.headers ? {...options, ...defaultHeader} : defaultHeader;

        options.body = JSON.stringify(options.body) || false;
        if (!options.body) delete options.body;

        setTimeout(() => controller.abort(),15000);

        return fetch(url, options)
            .then(resp => resp.ok ? resp.json(): Promise.reject({
                error: true,
                status: resp.status || '00',
                statusText: resp.statusText || 'DICTIONARY.ERROR_OCCURRED'
            }))
            .catch((err) => err);
    }
    const get = (url: string, options = {}) => customFetch(url, options);
    const post = (url: string, options: any = {}) => {
        options.method = 'POST'
        return customFetch(url, options)
    }
    const put = (url: string, options: any = {}) => {
        options.method = 'PUT'
        return customFetch(url, options)
    }
    const del = (url: string, options: any = {}) => {
        options.method = 'DELETE'
        return customFetch(url, options)
    }

    return {
        get, post, put, del,
    };
}