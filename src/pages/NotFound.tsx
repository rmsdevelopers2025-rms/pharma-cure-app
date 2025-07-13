
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-24 h-24 mx-auto mb-6">
          <img 
            src="/lovable-uploads/c2a08633-046c-4777-a1c8-0fc700677015.png" 
            alt="PharmaCure Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg">
          <a href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
