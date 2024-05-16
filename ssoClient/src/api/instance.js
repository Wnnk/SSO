import axios from 'axios';
import { ElLoading } from 'element-plus';
const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001',
    timeout: 3000,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  let loadingInstance = null;

  instance.interceptors.request.use(config => {
    loadingInstance = ElLoading.service({ background:"rgba(0,0,0,0.7)"});
    return config;
  }, error => {
    return Promise.reject(error);
  });


  instance.interceptors.response.use(response => {
    loadingInstance.close();
    return response;
  }, error => {
    loadingInstance.close();
    return Promise.reject(error);
  });
  export default instance;
