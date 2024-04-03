import { Navigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

export const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/auth" replace />;
};
