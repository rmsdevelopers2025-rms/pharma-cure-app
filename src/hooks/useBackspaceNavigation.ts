import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useBackspaceNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if backspace is pressed and not in an input/textarea
      if (
        event.key === 'Backspace' &&
        event.target instanceof HTMLElement &&
        event.target.tagName !== 'INPUT' &&
        event.target.tagName !== 'TEXTAREA' &&
        !event.target.isContentEditable
      ) {
        event.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);
};
