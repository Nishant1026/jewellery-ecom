import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const handleHoverStart = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsHovered(true);
        setCursorText(target.getAttribute('data-cursor') || 'VIEW');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleHoverStart);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleHoverStart);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center rounded-full mix-blend-difference"
      animate={{
        x: mousePosition.x - (isHovered ? 36 : 8),
        y: mousePosition.y - (isHovered ? 36 : 8),
        width: isHovered ? 72 : 16,
        height: isHovered ? 72 : 16,
        backgroundColor: '#FFFFFF',
      }}
      transition={{
        type: 'spring',
        damping: 28,
        stiffness: 350,
        mass: 0.5,
      }}
    >
      {isHovered && cursorText && (
        <span className="text-[10px] tracking-[0.2em] font-medium text-[#1B1815] uppercase select-none">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
};
