import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-3xl font-extrabold">
        Your account has been confirmed!
      </h1>
      <Button size={"lg"} onClick={() => navigate("/notes", { replace: true })}>
        Continue to Notes
      </Button>
    </div>
  );
}
