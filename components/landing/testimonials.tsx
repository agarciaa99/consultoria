"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Roberto Garcia",
    company: "TechStart S.A.",
    content:
      "Nexus transformo completamente nuestra presencia digital. El equipo entendio perfectamente nuestra vision y la ejecuto de manera impecable. Nuestras conversiones aumentaron un 150%.",
    rating: 5,
  },
  {
    name: "Maria Fernandez",
    company: "Innovate Labs",
    content:
      "Profesionalismo y creatividad en cada paso del proyecto. La comunicacion fue excepcional y el resultado final supero nuestras expectativas. Altamente recomendados.",
    rating: 5,
  },
  {
    name: "Juan Pablo Torres",
    company: "EcoSolutions",
    content:
      "Desde el primer dia se noto la diferencia. Su enfoque estrategico y atencion al detalle nos ayudo a destacar en un mercado muy competitivo. Excelente inversion.",
    rating: 5,
  },
  {
    name: "Carolina Mendez",
    company: "Digital Ventures",
    content:
      "Trabajar con Nexus fue una experiencia transformadora. Su equipo combina creatividad con solida experiencia tecnica. El resultado habla por si solo.",
    rating: 5,
  },
  {
    name: "Andres Ruiz",
    company: "StartupHub",
    content:
      "Entregaron mas de lo prometido y en tiempo record. Su dedicacion y profesionalismo son incomparables. Sin duda volveremos a trabajar juntos.",
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Calcula la posición relativa de cada tarjeta respecto al índice actual
  const getCardStatus = (index: number) => {
    const diff =
      (index - currentIndex + testimonials.length) % testimonials.length;

    if (diff === 0) return "active"; // Centro
    if (diff === 1 || diff === -(testimonials.length - 1)) return "next"; // Derecha
    if (diff === testimonials.length - 1 || diff === -1) return "prev"; // Izquierda
    return "hidden";
  };

  return (
    <section id="testimonials" className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Lo que dicen nuestros <span className="text-primary">clientes</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            La satisfaccion de nuestros clientes es nuestra mejor carta de
            presentacion.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Botones de Navegación (Desktop) */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-background/80 backdrop-blur-sm hover:bg-background hidden md:flex rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-background/80 backdrop-blur-sm hover:bg-background hidden md:flex rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Carrusel Contenedor */}
          <div className="relative h-[400px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => {
              const status = getCardStatus(index);

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    x:
                      status === "active"
                        ? 0
                        : status === "prev"
                          ? "-105%"
                          : status === "next"
                            ? "105%"
                            : 0,
                    scale: status === "active" ? 1 : 0.85,
                    opacity:
                      status === "active" ? 1 : status === "hidden" ? 0 : 0.4,
                    zIndex: status === "active" ? 20 : 10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="absolute w-full max-w-[320px] md:max-w-[450px]"
                  style={{
                    pointerEvents: status === "active" ? "auto" : "none",
                    visibility: status === "hidden" ? "hidden" : "visible",
                  }}
                >
                  <Card
                    className={`border-border/50 shadow-lg ${status === "active" ? "border-primary/30 ring-1 ring-primary/10" : ""}`}
                  >
                    <CardContent className="p-6 md:p-8">
                      <Quote className="h-8 w-8 text-primary/20 mb-4" />
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-primary text-primary"
                            />
                          ),
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base italic">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm md:text-base">
                            {testimonial.name}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Controles Mobile */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Dots de navegación */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
