import axios from 'axios';

const $axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});


export default $axios;