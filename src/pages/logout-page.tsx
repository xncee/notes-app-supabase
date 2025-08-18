import { useAuth } from "@/context/auth-context";
import { Navigate } from "react-router-dom";

export default function LogoutPage() {
    const { isAuth, logout } = useAuth();
    if (isAuth) {
        try {
            logout();
        } catch (error) {
            console.error(error);
        }
    }

    return <Navigate to="/" replace />;
}
