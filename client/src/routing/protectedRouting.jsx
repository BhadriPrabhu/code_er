import { Navigate } from "react-router";
import useUserStore from "../store/store";

export default function ProtectedRoute({ children, allowedRoles }) {
  const isAuth = useUserStore((state) => state.isAuth);
  const role = useUserStore((state) => state.role);

  if (!isAuth) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;
  return children;
}
