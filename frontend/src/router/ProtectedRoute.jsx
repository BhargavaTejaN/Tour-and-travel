import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("user");

  if (isLoggedIn === "null") {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
