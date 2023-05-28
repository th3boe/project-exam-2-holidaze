import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const URL = "https://api.noroff.dev/api/v1/holidaze";

export default function useAxios() {
  const [authenticate] = useContext(AuthContext);

  const apiClient = axios.create({
    APIbase: URL,
  });

  apiClient.interceptors.request.use(function (config) {
    const token = authenticate.accessToken;
    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
  });

  return apiClient;
}
