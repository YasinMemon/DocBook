import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const adminToken = localStorage.getItem("adminToken");
  const userRole = localStorage.getItem("userRole");

  if (adminToken && userRole === "admin") {
    return <Outlet />;
  }

  return <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
