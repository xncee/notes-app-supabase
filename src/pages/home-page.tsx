import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h2 className="mb-4 text-4xl font-extrabold md:text-5xl">
          Organize Your Notes Effortlessly
        </h2>
        <p className="mb-8 max-w-xl text-lg md:text-xl">
          Secure, simple, and fast note-taking app. Access your notes anywhere,
          anytime.
        </p>
        <Link
          to="/signup"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-3 font-semibold shadow transition"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
}
