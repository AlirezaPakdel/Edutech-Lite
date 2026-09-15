import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    // شرط جدی برای عدم ارسال مقادیر undefined یا null به صورت رشته
    if (token && token !== 'undefined' && token !== 'null') {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => Promise.reject(error));

export default api;