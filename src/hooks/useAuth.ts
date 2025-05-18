import { useContext } from "react";
import { AuthContext } from "../provider/AuthProviders";

interface AuthContextType {
  user: any; // TODO: Replace 'any' with your specific user type
  loading: boolean;
}

const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};

export default useAuth;
