"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  role: string
  avatar: string
  content: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Becker",
    role: "Designer",
    avatar: "https://picsum.photos/seed/picsum/200/300",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam amet animi blanditiis consequatur debitis dicta distinctio, enim error eum iste libero modi nam natus perferendis possimus quasi sint sit tempora voluptatem.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Developer",
    avatar: "https://picsum.photos/seed/picsum/200/300",
    content:
      "Exceptional service and quality products! The team went above and beyond to ensure our project was completed on time. Their attention to detail and professional approach made all the difference.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Product Manager",
    avatar: "https://picsum.photos/seed/picsum/200/300",
    content:
      "Outstanding experience from start to finish. The innovative solutions provided exceeded our expectations and helped us achieve our business goals faster than anticipated.",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Marketing Director",
    avatar: "https://picsum.photos/seed/picsum/200/300",
    content:
      "Professional, reliable, and creative team. They understood our vision perfectly and delivered results that truly impressed our stakeholders. Highly recommended!",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
      <div className="mx-auto px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Our Client Say!</h2>

          {/* Testimonial Content */}
          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 rounded-full bg-background shadow-md hover:shadow-lg transition-all duration-200 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 rounded-full bg-background shadow-md hover:shadow-lg transition-all duration-200 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>

            {/* Testimonial Card */}
            <div className="px-8 md:px-16">
              <div className="transition-all duration-500 ease-in-out">
                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 min-h-[120px] flex items-center justify-center">
                  &#34;{currentTestimonial.content}&#34;
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center justify-center space-x-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-foreground">{currentTestimonial.name}</h4>
                    <p className="text-red-500 font-medium">{currentTestimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentIndex === index ? "bg-red-500 w-6" : "bg-gray-300 hover:bg-gray-400",
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
