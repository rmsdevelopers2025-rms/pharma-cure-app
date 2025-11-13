import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSwipeNavigation = () => {
  const navigate = useNavigate();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = touchEndX.current - touchStartX.current;
      
      // Swipe right (go back)
      if (swipeDistance > minSwipeDistance) {
        navigate(-1);
      }
      
      // Swipe left (go forward)
      if (swipeDistance < -minSwipeDistance) {
        navigate(1);
      }

      // Reset values
      touchStartX.current = 0;
      touchEndX.current = 0;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate]);
};
