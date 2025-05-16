import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,            // importing it from .env.local file which is at the root level
});

export default API;
