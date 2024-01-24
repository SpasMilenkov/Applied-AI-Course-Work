import axios from "axios";

const BASE_URL = 'http://localhost:5214/api/';

export default axios.create({
    baseURL: BASE_URL
});
