// File to configure Axios.
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ecommerce-project-0asp.onrender.com',
    withCredentials: true
});

export default instance;