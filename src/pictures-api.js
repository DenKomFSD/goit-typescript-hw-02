import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const ACCESS_KEY = "PEh24A30KBb0aNmQPS0d7Zfg885-YK-pcwct2lFdSAo";

export const fetchImages = async (query, page, perPage = 12) => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: ACCESS_KEY,
      query: query,
      page: page,
      per_page: perPage,
    },
  });
  return response.data;
};
