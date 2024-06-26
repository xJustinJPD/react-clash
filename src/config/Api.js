import axios from 'axios';

// const local = axios.create({
//     baseURL: 'https://clash-0707c55bf2f2.herokuapp.com/api'
// });

const local = axios.create({
    baseURL: 'https://clash-0707c55bf2f2.herokuapp.com/api'
});
const discord = axios.create({
    baseURL: 'https://discord.com/api/oauth2'
});
// const local = axios.create({
//     baseURL: 'http://localhost/api'
// });

const picture = axios.create({
    baseURL: 'http://localhost:80/images'
});

export default [local, picture, discord];
