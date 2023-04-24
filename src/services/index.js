import axios from 'axios'
const getUrl = "http://localhost:8800/api";

export default axios.create({
    baseURL: `${getUrl}`,
});
