import axios from "./index.js";

const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers = {
            Authorization:"Bearer " + token,
        };
    }
    else 
    {
        delete axios.defaults.headers.Authorization;
    }
};

export default setAuthHeader;