import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

export default function UserActionsMenu() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="bg-accent flex h-10 w-10 rounded-full"></button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="end">
        <DropdownMenuLabel className="text-muted-foreground">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigate("/notes");
          }}
        >
          Notes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            navigate("/logout");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
