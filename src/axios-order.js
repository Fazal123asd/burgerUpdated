import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-project-1508499035905.firebaseio.com/'
});

export default instance;