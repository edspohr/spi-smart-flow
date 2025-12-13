'use client';

import { useEffect, useState } from 'react';
import { mockOTA, getTimeRemaining, calculateDiscount } from '@/data/mock-clients';

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(mockOTA.discountDeadline));
  const discount = calculateDiscount(mockOTA);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(mockOTA.discountDeadline));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.expired) {
    return (
      <div className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-center gap-4">
          <span className="text-lg font-medium">
            ⚠️ El período de descuento ha expirado
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white py-3 px-4 shadow-lg animate-pulse-glow">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">¡Carrera contra el tiempo!</span>
        </div>
        
        <div className="flex items-center gap-1 font-mono text-xl md:text-2xl font-bold animate-countdown-pulse">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-inner">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-white/80 text-sm">días</span>
          <span className="mx-1">:</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-inner">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-white/80 text-sm">hrs</span>
          <span className="mx-1">:</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-inner">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-white/80 text-sm">min</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base">para perder tu descuento</span>
          <span className="bg-white text-orange-600 font-bold px-4 py-1.5 rounded-full text-sm md:text-base shadow-lg">
            Ahorra ${discount.toLocaleString()} USD
          </span>
        </div>
      </div>
    </div>
  );
}
