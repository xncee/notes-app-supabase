import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function AuthButtons() {
    return (
        <>
            <Button asChild size="sm" variant={"outline"}>
                <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm" variant={"default"}>
                <Link to="/sign-up">Sign up</Link>
            </Button>
        </>
    );
}
