import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burgerbuilder-acc5e.firebaseio.com/'
});

export default axiosInstance;