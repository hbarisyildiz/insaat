"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  title: string | null;
  content: string;
}

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  if (!testimonials.length) return null;

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-amber-500 font-semibold uppercase tracking-wider mb-3">
            Müşteri Görüşleri
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Müşterilerimiz Ne Diyor?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Quote className="h-12 w-12 text-amber-500/30 mx-auto mb-6" />

          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>

          <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
            &ldquo;{testimonials[current].content}&rdquo;
          </p>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-lg">
              {testimonials[current].name}
            </p>
            {testimonials[current].title && (
              <p className="text-gray-500 text-sm">
                {testimonials[current].title}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() =>
                setCurrent(
                  (current - 1 + testimonials.length) % testimonials.length
                )
              }
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-amber-500 hover:text-amber-500 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() =>
                setCurrent((current + 1) % testimonials.length)
              }
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-amber-500 hover:text-amber-500 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
