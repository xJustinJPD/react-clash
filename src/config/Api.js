import axios from 'axios';

const local = axios.create({
    baseURL:'http://localhost/api'
})


export default local;