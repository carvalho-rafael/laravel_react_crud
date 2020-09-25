import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost/laraveltest/public/api',

});

export default api;