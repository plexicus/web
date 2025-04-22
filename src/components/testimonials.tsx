"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const testimonials = [
    {
      quote: "Plexicus has revolutionized our remediation process - our team is saving hours every week!",
      name: "Alejandro Aliaga",
      role: "CTO, Ontinet",
      image: "/images/aliaga.png",
    },
    {
      quote: "The integration is seamless, and the AI-powered auto-remediation is a game-changer.",
      name: "Michael Chen",
      role: "DevSecOps Lead, Devtia",
      image: "/images/chen.jpg",
    },
    {
      quote: "We've reduced our vulnerability remediation time by 90% since implementing Plexicus.",
      name: "Emily Rodriguez",
      role: "Security Engineer, Soluciones 480",
      image: "/images/rodriguez.jpg",
    },
    {
      quote: "The AI agent's ability to automatically generate fixes for vulnerabilities has transformed our workflow.",
      name: "David Wilson",
      role: "Head of Security, HuMaIND",
      image: "/images/wilson.jpg",
    },
    {
      quote:
        "Plexicus has become an essential part of our security toolkit. It's like having an expert security engineer available 24/7.",
      name: "Jennifer Lee",
      role: "CTO, Quasar Cybersecurity",
      image: "/images/lee.jpg",
    },
  ]

  // Use intersection observer to only animate when visible
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const isNowVisible = entries[0].isIntersecting
        if (isVisible !== isNowVisible) {
          setIsVisible(isNowVisible)
        }
      },
      { threshold: 0.2, rootMargin: "100px" },
    )

    observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  // Memoize the rotation function
  const rotateTestimonial = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [testimonials.length])

  // Only run the animation when visible and not paused
  useEffect(() => {
    if (!isVisible || isPaused) return

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Start the rotation
    timeoutRef.current = setTimeout(rotateTestimonial, 5000)

    // Return cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isPaused, rotateTestimonial, isVisible])

  // Pause rotation on hover
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true)
  }, [])

  // Resume rotation on mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsPaused(false)
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from security teams who have transformed their vulnerability remediation process
          </p>
        </div>

        {isVisible && (
          <div className="relative max-w-5xl mx-auto" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {/* Navigation Arrows */}
            <button
              className="absolute left-0 md:-left-16 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full shadow-lg p-4 hover:bg-gray-50 transition-all duration-200"
              onClick={() => {
                setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
              }}
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              className="absolute right-0 md:-right-16 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full shadow-lg p-4 hover:bg-gray-50 transition-all duration-200"
              onClick={() => {
                setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
              }}
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            {/* Main testimonial - Image-oriented minimalistic design */}
            <div
              className="bg-white rounded-xl shadow-lg p-0 mb-12 relative z-10 max-w-5xl mx-auto overflow-hidden"
              style={{ minHeight: "500px" }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Large image section - takes up more space */}
                <div className="md:w-1/2 relative h-[400px] md:h-[500px]">
                  {/* Use native img for better performance */}
                  <div className="absolute inset-0">
                    <img
                      src={testimonials[activeIndex].image || "/placeholder.svg"}
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent md:bg-gradient-to-t md:from-black/40 md:via-transparent md:to-transparent"></div>

                  {/* Violet translucent footer for better readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#8220ff]/20 to-transparent"></div>

                  {/* Name and role positioned over the image */}
                  <div className="absolute bottom-6 left-6 text-white z-10">
                    <h4 className="font-bold text-xl">{testimonials[activeIndex].name}</h4>
                    <p className="text-white/90 font-medium">{testimonials[activeIndex].role}</p>
                  </div>
                </div>

                {/* Quote section - minimalistic design */}
                <div className="md:w-1/2 p-8 flex items-center">
                  <div>
                    {/* Minimalistic quote mark */}
                    <div className="text-[#8220ff] text-5xl font-serif leading-none mb-4">"</div>

                    <blockquote className="text-lg md:text-xl text-gray-800 font-light mb-6">
                      {testimonials[activeIndex].quote}
                    </blockquote>

                    {/* Minimalistic closing quote mark */}
                    <div className="text-[#8220ff] text-5xl font-serif leading-none text-right">"</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-[#8220ff] w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
