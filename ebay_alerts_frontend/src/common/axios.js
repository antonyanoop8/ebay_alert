import axios from 'axios';
import { BaseUrl } from './constants';

//Create default axios instance
const api = axios.create();
api.defaults.baseURL = BaseUrl;

// Request interceptor
api.interceptors.request.use(
    function (config) {
        // Add a trailing slash if it does not exist
        if (config.url[config.url.length - 1] !== '/') {
            config.url += '/';
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject({
            error: error?.response?.data?.errors?.[0],
            message: error?.response?.data?.message
        });
    }
);

export default api;
