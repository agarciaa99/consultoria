"use client";

import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const WORDS = [
  { text: "ideas", color: "text-primary", underline: "bg-accent/40" },
  { text: "sueños", color: "text-emerald-600", underline: "bg-emerald-300/40" },
  { text: "visiones", color: "text-amber-600", underline: "bg-amber-300/40" },
  { text: "proyectos", color: "text-rose-600", underline: "bg-rose-300/40" },
  { text: "conceptos", color: "text-cyan-600", underline: "bg-cyan-300/40" },
];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentWord = WORDS[wordIndex];

  const typeText = useCallback(() => {
    const fullText = currentWord.text;

    if (isPaused) {
      setTimeout(() => setIsPaused(false), 1500);
      return;
    }

    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      } else {
        setIsPaused(true);
        setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(fullText.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % WORDS.length);
      }
    }
  }, [currentWord.text, displayText, isDeleting, isPaused]);

  useEffect(() => {
    const speed = isDeleting ? 50 : isPaused ? 1500 : 100;
    const timer = setTimeout(typeText, speed);
    return () => clearTimeout(timer);
  }, [typeText, isDeleting, isPaused]);
  
  return (
  <section
  id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance max-w-4xl">
            Transformamos
            <span className="relative mx-3 inline-block">
              <span className="relative inline-block">
                <span
                  className={`relative z-10 transition-colors duration-300 ${currentWord.color}`}
                >
                  {displayText}
                </span>
                <span
                  className={`absolute bottom-0 sm:bottom-1 left-0 right-0 h-2 sm:h-3 transition-all duration-300 -z-10 ${currentWord.underline}`}
                />
              </span>
              <span className="animate-pulse text-primary">|</span>
            </span>
            en experiencias digitales
          </h1>

          {/* AQUÍ ESTÁ EL CAMBIO PRINCIPAL */}
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <Button asChild size={"lg"} className="group">
              <a href="#contact">
                Comenzar proyecto
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant={"outline"} size={"lg"}>
              <a href="#team">Conócenos</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}