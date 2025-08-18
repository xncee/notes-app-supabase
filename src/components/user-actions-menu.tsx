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
import { Button } from "./ui/button";

export default function UserActionsMenu() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    variant="ghost"
                    size={"sm"}
                    className="flex gap-2 items-center bg-none border-none shadow-none"
                >
                    <div className="rounded-full w-8.5 h-8.5 bg-[var(--color-ring)]"></div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-content" align="start">
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
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
