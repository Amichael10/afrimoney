import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <p className="font-mono text-xs font-medium text-primary">404 · Route Not Found</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground">
            Page not found
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The requested path <code className="font-mono text-xs text-foreground">{location.pathname}</code> does not exist.
          </p>
          <Link
            to="/"
            className="fc-btn-primary mt-6 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to Directory
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
