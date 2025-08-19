import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="mt-25 flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-2xl font-bold">Your account has been confirmed!</h1>
      <Button size={"lg"} onClick={() => navigate("/notes", { replace: true })}>
        Continue to Notes
      </Button>
    </div>
  );
}
