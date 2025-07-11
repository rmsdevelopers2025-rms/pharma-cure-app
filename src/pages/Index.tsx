
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to splash screen immediately
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="text-center text-white">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <span className="font-bold text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            PC
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-2">Pharma Cure</h1>
        <p className="text-xl font-semibold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
          Learn Before You Swallow
        </p>
      </div>
    </div>
  );
};

export default Index;
