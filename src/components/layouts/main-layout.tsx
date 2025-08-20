import Footer from "../footer";
import NavBar from "../nav-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
