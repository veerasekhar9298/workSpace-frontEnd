import axios from 'axios';

const Axiosinstance = axios.create({
  baseURL: 'http://127.0.0.1:3857', 
});

export default Axiosinstance