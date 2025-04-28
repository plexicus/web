'use client';

import { useRef, useEffect } from 'react';

// Define type for partners
type Partner = {
  name: string;
  logo: string;
};

export default function Partners() {
  // Reference to control the animation
  const carouselRef = useRef<HTMLDivElement>(null);

  // Pause animation on hover
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleMouseEnter = () => {
      carousel.style.animationPlayState = 'paused';
    };

    const handleMouseLeave = () => {
      carousel.style.animationPlayState = 'running';
    };

    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const partners: Partner[] = [
    { name: 'Deloitte', logo: '/images/deloitte-logo-new.png' },
    { name: 'Prowler', logo: '/images/prowler.png' },
    { name: 'soluciones480', logo: '/images/soluciones480.png' },
    { name: 'Quasar Cybersecurity', logo: '/images/quasarsec.png' },
    { name: 'OverXeT', logo: '/images/overxet.png' },
    { name: 'HuMaIND', logo: '' },
    { name: 'VigSecDrone', logo: '/images/vigsecdrone.png' },
    { name: 'Oesia', logo: '/images/oesia.png' },
    { name: 'Telefonica', logo: '/images/telefonica-logo-new.png' },
    { name: 'ironchip', logo: '/images/ironchip.png' },
    { name: 'Barbaratech', logo: '/images/barbara-logo.png' },
    { name: 'Wandari', logo: '/images/wandari.png' },
    { name: 'Puffin Security', logo: '/images/puffin.png' },
  ];

  // Custom inline styles for the continuous animation
  const carouselStyles = `
@keyframes seamlessScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-120px * ${partners.length} - 16px * ${partners.length}));
  }
}
`;

  return (
    <section className="py-16 bg-white" aria-labelledby="partners-heading">
      <style dangerouslySetInnerHTML={{ __html: carouselStyles }} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 id="partners-heading" className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            See How DevSecOps Teams Use Plexicus
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by leading organizations to secure their software supply chain
          </p>
        </div>

        <div className="relative overflow-hidden w-full py-8">
          { /* Gradient masks for stronger fading effect */ }
          <div className="absolute left-0 top-0 bottom-0 w-[150px] z-10 bg-gradient-to-r from-white via-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-[150px] z-10 bg-gradient-to-l from-white via-white to-transparent pointer-events-none"></div>

          { /* Single row of logos with fading effect */ }
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex whitespace-nowrap"
              style={{
                animation: 'seamlessScroll 60s linear infinite',
                willChange: 'transform',
              }}
              aria-label="Partner logos carousel"
            >
              { /* All partners in a single row - duplicated for seamless loop */ }
              { [...partners, ...partners, ...partners].map((partner, i) => (
                <div
                  key={`logo-${i}`}
                  className="flex-shrink-0 w-[120px] h-12 mx-8 flex items-center justify-center"
                  aria-label={`${partner.name} logo`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    { partner.logo ? (
                      <img
                        src={partner.logo || '/placeholder.svg'}
                        alt={`${partner.name} logo`}
                        className="max-w-full max-h-full object-contain p-1"
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className={`text-sm font-medium ${partner.name === 'HuMaIND' ? 'text-orange-500' : 'text-gray-700'}`}
                      >
                        { partner.name }
                      </span>
                    ) }
                  </div>
                </div>
              )) }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
