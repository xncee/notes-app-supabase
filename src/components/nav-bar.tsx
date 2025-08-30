import { useAuth } from "@/context/auth-context";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./theme-switcher";
import AuthButtons from "./auth-buttons";
import UserActionsMenu from "./user-actions-menu";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
  const { isAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center justify-between border-b px-5 py-5 shadow-sm md:px-10 md:py-5">
      <Link to="/" replace>
        <h1 className="text-primary text-2xl font-extrabold">Notes App</h1>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeSwitcher ICON_SIZE={20} />

        {isAuth && location.pathname !== "/notes" && (
          <Button onClick={() => navigate("/notes")}>My Notes</Button>
        )}

        {isAuth && location.pathname === "/notes" && (
          <Button onClick={() => navigate("/notes/new")}>New Note</Button>
        )}

        {isAuth ? <UserActionsMenu /> : <AuthButtons />}
      </div>
    </div>
  );
}
