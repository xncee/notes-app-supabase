import { useAuth } from "@/context/auth-context";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./theme-switcher";
import AuthButtons from "./auth-buttons";
import UserActionsMenu from "./user-actions-menu";
export default function NavBar() {
  const { isAuth } = useAuth();

  return (
    <div className="flex w-full items-center justify-between border-b px-5 py-4 shadow-sm">
      <Link to="/" replace>
        <p className="text-2xl font-bold text-blue-700">Notes App</p>
      </Link>
      <div className="flex gap-2">
        {isAuth ? <UserActionsMenu /> : <AuthButtons />}
        <ThemeSwitcher ICON_SIZE={16} />
      </div>
    </div>
  );
}
