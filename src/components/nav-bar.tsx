import { useAuth } from "@/context/auth-context";
import { Link } from "react-router-dom";

export default function NavBar() {
    const { isAuth, user } = useAuth();

    return (
        <div className="flex bg-gray-400 justify-between p-4">
            <Link to="/" replace>
                <p className="text-xl font-bold">Notes App</p>
            </Link>
            {isAuth ? (
                <div className="flex gap-2">
                    <p>{`Logged in as ${user?.email}`}</p>
                    <Link to="/logout" replace>
                        Logout
                    </Link>
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link to="/login">Login</Link>
                    <Link to="/sign-up">Sign Up</Link>
                </div>
            )}
        </div>
    );
}
