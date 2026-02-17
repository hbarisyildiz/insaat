"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Building2, Users, Award } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="text-4xl lg:text-5xl font-bold text-white">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection({
  years,
  projects,
  customers,
}: {
  years: string;
  projects: string;
  customers: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const stats: StatItem[] = [
    {
      icon: <Calendar className="h-8 w-8" />,
      value: parseInt(years) || 30,
      suffix: "+",
      label: "Yıllık Deneyim",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      value: parseInt(projects) || 150,
      suffix: "+",
      label: "Tamamlanan Proje",
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: parseInt(customers) || 500,
      suffix: "+",
      label: "Mutlu Müşteri",
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: 100,
      suffix: "%",
      label: "Müşteri Memnuniyeti",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-r from-gray-900 to-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-amber-500 mb-3 flex justify-center">
                {stat.icon}
              </div>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                inView={inView}
              />
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
