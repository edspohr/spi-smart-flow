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
      <div className="w-full bg-red-50 border-b border-red-100 py-2 px-4">
        <div className="container mx-auto text-center">
          <span className="text-sm text-red-600 font-medium">
            El período de descuento ha expirado
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-amber-50 border-b border-amber-100 py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-4 text-sm">
        <span className="text-amber-800">
          <span className="font-medium">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
          </span>
          {' '}restantes
        </span>
        <span className="text-amber-600">•</span>
        <span className="text-amber-800">
          Ahorra <span className="font-medium">${discount.toLocaleString()}</span>
        </span>
      </div>
    </div>
  );
}
