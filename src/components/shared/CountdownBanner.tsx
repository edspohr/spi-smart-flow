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
      <div className="w-full bg-red-500 text-white py-2.5 px-4">
        <div className="container mx-auto text-center">
          <span className="text-sm font-medium">
            El período de descuento ha expirado
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-linear-to-r from-orange-500 to-amber-500 text-white py-2.5 px-4">
      <div className="container mx-auto flex items-center justify-center gap-3 text-sm font-medium">
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m restantes
        </span>
        <span className="opacity-70">•</span>
        <span className="bg-white/20 px-2.5 py-0.5 rounded-full">
          Ahorra ${discount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
