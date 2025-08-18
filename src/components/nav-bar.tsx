import { useAuth } from "@/context/auth-context";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./theme-switcher";
import AuthButtons from "./auth-buttons";
import UserActionsMenu from "./user-actions-menu";
export default function NavBar() {
  const { isAuth } = useAuth();

  return (
    <div className="flex w-full justify-between py-4 pr-5 pl-10 shadow-md">
      {" "}
      <Link to="/" replace>
        <p className="text-2xl font-bold text-blue-700">Notes App</p>
      </Link>
      <div className="flex gap-2">
        {isAuth ? <UserActionsMenu /> : <AuthButtons />}
        <ThemeSwitcher />
      </div>
    </div>
  );
}
