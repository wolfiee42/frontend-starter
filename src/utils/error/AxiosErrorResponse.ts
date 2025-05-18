import { signOut } from "firebase/auth";
import { AxiosError } from "axios";
import auth from "../../config/firebase.config";

interface ErrorResponse {
  message?: string;
  errorMessages?: string | string[];
}

interface ResponseObject {
  statusCode: number;
  message: string;
  errorMessages: string | string[];
}

export const axiosErrorResponseObject = (
  error: AxiosError,
  errorResponse: ErrorResponse
): ResponseObject => {
  const responseObject = {
    statusCode: error?.response?.status || 500,
    message: errorResponse?.message || "Something went wrong",
    errorMessages:
      errorResponse?.errorMessages || "No detailed error messages provided",
  };
  return responseObject;
};

export const logOut = async (
  error: AxiosError,
  errorAlert: (message: string) => void
) => {
  const result = await signOut(auth);
  if (!result) {
    errorAlert(error.response?.data?.message);
  } else {
    errorAlert("Failed to log out after token verification failed");
  }
};
