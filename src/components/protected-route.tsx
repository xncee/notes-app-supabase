import { useAuth } from "@/context/auth-context";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuth } = useAuth();

  const location = useLocation();
  if (isLoading) {
    return (
      <h1 className="flex h-screen items-center justify-center text-xl">
        Loading...
      </h1>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
