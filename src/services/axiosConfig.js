import axios from 'axios';

const Axiosinstance = axios.create({
  baseURL: 'https://sharespace-xwig.onrender.com', 
});

export default Axiosinstance