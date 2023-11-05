import axios from 'axios';

const instance = axios.create({
  // đường dẫn của api
  baseURL: 'https://pbl6-production-4c10.up.railway.app/api/',
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const access_token = sessionStorage.getItem('token');
    config.headers.Authorization = `Bearer ${access_token}`;
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
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
export default instance;
