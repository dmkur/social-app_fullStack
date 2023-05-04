import axios from "axios";

const makeRequest = axios.create({
    baseURL: 'http://localhost:8800/api/',
    // need for send access token to backend
    withCredentials: true
});

export {makeRequest}