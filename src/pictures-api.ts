import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const ACCESS_KEY = "PEh24A30KBb0aNmQPS0d7Zfg885-YK-pcwct2lFdSAo";

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    full: string;
    regular: string;
  };
  alt_description: string;
}

export interface FetchImagesResponse {
  results: UnsplashImage[];
  total: number;
  total_pages: number;
}

export interface FetchImagesParams {
  query: string;
  page: number;
  perPage?: number;
}

export const fetchImages = async (
  query: string,
  page: number,
  perPage: number = 12
): Promise<FetchImagesResponse> => {
  const response = await axios.get<FetchImagesResponse>("/search/photos", {
    params: {
      client_id: ACCESS_KEY,
      query,
      page,
      per_page: perPage,
    },
  });
  return response.data;
};
