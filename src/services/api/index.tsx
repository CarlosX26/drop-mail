import axios from "axios";

const api = axios.create({
  baseURL: "https://dropmail.me/api/graphql/web-test-20230216qi62K",
  timeout: 5000,
});

export default api;
