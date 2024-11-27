import axios from 'axios'

const endpoint = import.meta.env.VITE_STAGING_ENDPOINT
const Instance = axios.create({
    baseURL: endpoint    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

export default Instance