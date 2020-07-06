import axios from 'axios';

const $axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

$axios.interceptors.request.use(config => {
  if(localStorage.getItem('token')) {
    if (localStorage.getItem('token') === 'hoangnm') {
      config.headers = {'x-access-token' : localStorage.getItem('token')};
    } else {
      config.headers = {'x-access-token' : `Bearer ${localStorage.getItem('token')}`};
    }
  }

  return config;
});


export default $axios;