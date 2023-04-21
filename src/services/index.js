//DEV LINK AXIOS


import axios from 'axios'

//FOR DEV 
const getUrl = "https://api-pcp.novate-digital.com";

//FOR PROD
// const getUrl = "https://api-pcp.novate-digital.com";

export default axios.create({
    baseURL: `${getUrl}`,
});
