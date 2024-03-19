import axios from 'axios';

const local = axios.create({
    baseURL: 'http://localhost/api'
});

const picture = axios.create({
    baseURL: 'http://localhost:80/images'
});

export default [local, picture];
