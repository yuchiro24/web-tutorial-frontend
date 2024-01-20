import axios from 'axios'

const axios_instance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axios_instance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios_instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const originalConfig = error.config;
        if (error.response && error.response.status === 401 && !originalConfig.retry) {
            originalConfig.retry = true;
            if (originalConfig.url === '/api/books/login/') {
                return Promise.reject(error);
            }
            // axios_instance
            //     .post('/api/books/retry', { refresh: "" })
            //     .then((res) => {
            //         return axios_instance(originalConfig);
            //     })
            //     .catch((err) => {
            //         return Promise.reject(err);
            //     });
        } else {
            return Promise.reject(error);
        }
    }
);

export default axios_instance;