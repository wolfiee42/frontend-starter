import axios from "axios";
import { axiosErrorResponseObject } from "../utils/error/AxiosErrorResponse";

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_axiosPublic,
    timeout: 60000,
  });
  axiosPublic.defaults.headers.post["Content-Type"] = "application/json";
  axiosPublic.defaults.headers["Accept"] = "application/json";
  axiosPublic.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const errorResponse = error?.response?.data;
      const responseObject = axiosErrorResponseObject(error, errorResponse);
      return Promise.reject(responseObject);
    }
  );
  return axiosPublic;
};

export default useAxiosPublic;
