import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAuth() {
  let auth = localStorage.getItem("token");
  return auth !== null ? <Navigate to="/home" /> : <Outlet />;
}
