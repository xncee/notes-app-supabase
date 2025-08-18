import { useAuth } from "@/context/auth-context";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./theme-switcher";
import AuthButtons from "./auth-buttons";
import UserActionsMenu from "./user-actions-menu";
export default function NavBar() {
    const { isAuth } = useAuth();

    return (
        <div className="flex justify-between py-4 pl-10 pr-5 w-full shadow-md">
            {" "}
            <Link to="/" replace>
                <p className="text-xl font-bold">Notes App</p>
            </Link>
            <div className="flex gap-2">
                {isAuth ? <UserActionsMenu /> : <AuthButtons />}
                <ThemeSwitcher />
            </div>
        </div>
    );
}
