//DEV LINK AXIOS


import axios from 'axios'

//FOR DEV 
const getUrl = "http://localhost:8800/api";

//FOR PROD
// const getUrl = "https://api-pcp.novate-digital.com";

export default axios.create({
    baseURL: `${getUrl}`,
});
