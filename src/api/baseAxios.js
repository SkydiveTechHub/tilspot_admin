import axios from 'axios';

const endpoint = process.env.REACT_APP_TEST_URL;

const Instance = axios.create({
  baseURL: endpoint,
  // headers:{
  //   'ngrok-skip-browser-warning': 'true'
  // }
});

// Request interceptor to set the token dynamically
Instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Replace with your token storage logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Instance;
