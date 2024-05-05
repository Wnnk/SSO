import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001',
    timeout: 3000,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  instance.interceptors.request.use(config => {
  
    return config;
  }, error => {
    return Promise.reject(error);
  });

  export default instance;