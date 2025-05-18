import axios from "axios";
import { errorAlert } from "../utils/alert/errorAlert";
import {
  axiosErrorResponseObject,
  logOut,
} from "../utils/error/AxiosErrorResponse";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_axiosSecure,
    withCredentials: true,
    timeout: 300000,
  });
  axiosSecure.defaults.headers.post["Content-Type"] = "application/json";
  axiosSecure.defaults.headers["Accept"] = "application/json";

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const errorResponse = error?.response?.data;
      const responseObject = axiosErrorResponseObject(error, errorResponse);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        await logOut(error, errorAlert);
      }

      return Promise.reject(responseObject);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
