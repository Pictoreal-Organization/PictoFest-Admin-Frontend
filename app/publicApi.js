import axios from "axios";

const publicApi = axios.create({
  baseURL: "https://pictofest-26-backend.onrender.com/api", // different base url
});

export default publicApi;
