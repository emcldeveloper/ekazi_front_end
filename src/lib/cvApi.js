import axios from "axios";

const cvApi = axios.create({
  baseURL: process.env.REACT_APP_CV_API_URL,
});

export default cvApi;
