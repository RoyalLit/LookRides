'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('[class*="fadeUp"], [class*="fadeIn"], [class*="slideUp"], [class*="fleetCard"], [class*="serviceCard"], [class*="trustCard"], [class*="testimonialCard"], [class*="valueCard"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
