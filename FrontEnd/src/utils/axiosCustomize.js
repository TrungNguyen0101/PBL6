import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({
  showSpinner: false,
  // trickleSpeed: 200000,
});

const instance = axios.create({
  // đường dẫn của api
  // baseURL: 'https://nthdv-pbl6.up.railway.app/api/',
  baseURL: 'http://localhost:3030/api/',
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const access_token = sessionStorage.getItem('token');
    config.headers.Authorization = `Bearer ${access_token}`;
    NProgress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done();
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
export default instance;
