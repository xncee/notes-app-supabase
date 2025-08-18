import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/context/auth-context";
import { Navigate, useLocation } from "react-router-dom";

export default function LoginPage() {
    const { isAuth } = useAuth();
    const location = useLocation();
    //console.log(location);
    if (isAuth) {
        const from = location.state?.from.pathname;
        if (from) return <Navigate to={from} />;
        else return <Navigate to="/notes" />;
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
}
