import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = sessionStorage.getItem("authToken");
  return authToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
