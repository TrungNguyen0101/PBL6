// axios-config.js
import axios from 'axios';

// const baseURL = 'http://localhost:3030/api';
const baseURL = 'https://nthdv-pbl6.up.railway.app/api';
// const baseURL = 'https://fakestoreapi.com';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = (url, config) => axiosInstance.get(url, config);

export const put = (url, data, config) => axiosInstance.put(url, data, config);

export const del = (url, config) => axiosInstance.delete(url, config);

export const post = (url, data, config) => axiosInstance.post(url, data, config);

export default axiosInstance;
