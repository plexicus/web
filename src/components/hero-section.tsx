'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Delay mounting effects slightly to prioritize initial render
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden py-16 -mt-16 pt-32"
      style={{
        background: 'radial-gradient(circle at right, #000000 0%, #1a1a1a 40%, #4a0ba3 70%, #8220ff 100%)',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)',
      }}
      aria-label="Hero section"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center pt-16 md:pt-20 lg:pt-24">
          <div className="space-y-4 relative z-10">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              AI Agent
              <br />
              Vulnerability
              <br />
              Remediator
            </h1>
            <p className="max-w-[600px] text-white/90 md:text-xl">
              Our ASPM is designed to be your cybersecurity AI Agent, offering continuous support, guidance, and
              automated solutions to keep your software supply chain secure against evolving threats
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="font-semibold bg-white text-[#8220ff]">
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white font-semibold border-white/20 hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            { /* Only render the complex effects when mounted */ }
            <div className="relative w-full max-w-3xl">
              { isMounted && (
                <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-white via-purple-300 to-[#8220ff] opacity-40 rounded-[32px] transform scale-110"></div>
              ) }

              { /* Optimize image loading with priority for LCP */ }
              <div
                className="w-full rounded-xl overflow-hidden relative z-10"
                style={{
                  borderRadius: '16px',
                  position: 'relative',
                  boxShadow: isMounted
                    ? '0 0 25px rgba(255, 255, 255, 0.8), 0 0 50px rgba(255, 255, 255, 0.4), 0 0 75px rgba(130, 32, 255, 0.3)'
                    : 'none',
                }}
              >
                <div className="relative">
                  { /* Use native img with loading="eager" for faster LCP */ }
                  <img
                    src="/productivity-dashboard.png"
                    alt="Admin dashboard interface"
                    className="w-full h-auto relative z-10 rounded-xl"
                    width="1200"
                    height="800"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
