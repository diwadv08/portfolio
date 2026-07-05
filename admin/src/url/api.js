import axios from 'axios';
import url from './nodeFile';

// Central axios instance. withCredentials is required so the browser
// sends/receives the httpOnly session cookie set by the backend on login.
const api = axios.create({
    baseURL: url,
    withCredentials: true,
});

export default api;
