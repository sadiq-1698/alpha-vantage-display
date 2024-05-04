import { useEffect, useRef, useState } from 'react';

// custom hook to handle on click outside component toggle visibility
export default function useComponentVisible() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);;

  const toggleChild = () => setIsComponentVisible(s => !s);

  const handleClickOutside = (e: MouseEvent | Event) => {
    if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  });

  return { wrapRef, toggleChild, isComponentVisible };
}
