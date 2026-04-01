import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer token', // automatically token from cookies get set in the header for each request,
    },
    withCredentials: true,
})

// Request Interceptor
API.interceptors.request.use((config) => {
    // console.log("Request Config:", config);
    return config;
});

// Response Interceptor
API.interceptors.response.use(
    (response) => {
        console.log("Response:", response);
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.log("Unauthorized - maybe redirect");
        }
        return Promise.reject(error);
    }
);


export default API;