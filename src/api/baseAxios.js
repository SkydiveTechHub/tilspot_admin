import axios from 'axios'

const endpoint = process.env.REACT_APP_TEST_URL;
const Instance = axios.create({
    baseURL: endpoint    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

export default Instance