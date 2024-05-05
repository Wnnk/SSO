import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3001',
    timeout: 3000,
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
    }
  });

  instance.interceptors.request.use(config => {
    if (!localStorage.getItem('token')) {
        window.location.href = `http://localhost:5000?url=${window.location.href}`;
        return Promise.reject(new Error('请先登录'));
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  export default instance;