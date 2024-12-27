import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return isVerified ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
