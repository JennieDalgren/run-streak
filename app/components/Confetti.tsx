'use client';

import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

interface ConfettiProps {
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ duration = 3000 }) => {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setWindowDimensions({ width, height });

    const timer = setTimeout(() => setIsActive(false), duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isActive ? (
    <ReactConfetti
      width={windowDimensions.width}
      height={windowDimensions.height}
      recycle={false}
      numberOfPieces={200}
    />
  ) : null;
};

export default Confetti;

