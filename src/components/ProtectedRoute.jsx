import { Navigate, Outlet, useNavigate } from "react-router-dom";
import parseJwt from "../utils/checkToken";

export default function ProtectedRoute() {
  const navigation = useNavigate();
  function refresh() {
    navigation(0);
  }
  let auth = localStorage.getItem("token");

  if (auth !== null) {
    parseJwt(auth, refresh);
  }
  return auth !== null ? <Outlet /> : <Navigate to="/" />;
}
