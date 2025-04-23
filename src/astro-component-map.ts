/**
 * This file maps components to their hydration needs for Astro migration
 * It helps identify which components need client-side JavaScript and which can be static
 */

// Component hydration mapping for Astro
export const componentHydration = {
  // Components that need full hydration (client:load)
  fullHydration: [
    "Navbar", // Needs immediate interactivity for navigation
  ],

  // Components that can be hydrated when visible (client:visible)
  visibleHydration: [
    "RemediationRace", // Animation can start when visible
    "HowItWorks", // Complex animations only needed when visible
    "Testimonials", // Carousel only needed when visible
  ],

  // Components that can be hydrated on user interaction (client:idle)
  idleHydration: [
    "ContactSection", // Form only needs to be interactive when user engages
  ],

  // Components that can be completely static (no client directive)
  static: [
    "Footer",
    "HeroSection", // Can be made static with CSS animations
    "Partners", // Can use CSS for animations
  ],

  // Components that need media-based hydration (client:media)
  mediaHydration: {
    MobileMenu: "(max-width: 768px)", // Only needed on mobile
  },
}

/**
 * Example usage in Astro:
 *
 * ---
 * import Navbar from '../components/Navbar.astro';
 * import HeroSection from '../components/HeroSection.astro';
 * import RemediationRace from '../components/RemediationRace.astro';
 * ---
 *
 * <Navbar client:load />
 * <HeroSection />
 * <RemediationRace client:visible />
 */
