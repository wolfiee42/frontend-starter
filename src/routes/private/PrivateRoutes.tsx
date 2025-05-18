import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/loading/Loading";
import type { FC } from "react";

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading isLoading={true} />;

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
