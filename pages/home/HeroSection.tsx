"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { IconChevronRight } from "@tabler/icons-react";

export default function Hero() {
  return (
    <section className="hero relative flex flex-col-reverse md:flex-row min-h-screen w-full overflow-hidden bg-off-white-500">
      {/* Left: Content */}
      <div className="relative z-10 flex flex-col justify-center items-start w-full md:w-1/2 pl-20 px-6 py-12 md:py-24">
        <p className="text-sm font-semibold text-field-green-500 mb-2 uppercase tracking-wider">Step Inside the Clubhouse</p>
        <h1 className="text-left text-2xl font-bold tracking-tighter text-field-green-500 md:text-6xl">
          Built for<br />
          <TypewriterEffect
            words={["Parents", "Organizations", "Tournaments"]}
            typingSpeed={80}
            duration={800}
            deletingSpeed={75}
          />
        </h1>
        {/* <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-field-green-500">A better way to find select baseball teams and sports</h1> */}
        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl">Clubhouse Baseball brings parents, organizations, and tournaments together in one clear, trusted place — without the noise.</p>
        <div className="flex flex-col w-full max-w-xs gap-3">
          <div className="flex flex-row gap-3 justify-start">
            <button
            className="inline-flex rounded-lg bg-field-green-500 text-white font-semibold py-3 px-6 shadow border border-white/30 transition whitespace-nowrap hover:bg-field-green-500/90 hover:cursor-pointer"
            >
              Find Teams & Tryouts
            </button>
            <button 
              className="inline-flex rounded-lg bg-white hover:bg-white/90 text-field-green-500 border border-gray-200 font-semibold py-3 px-6 shadow  hover:cursor-pointer transition whitespace-nowrap"
              >
                List Your Organization
            </button>
          </div>
          <button className="flex items-center justify-start gap-2 rounded-lg text-field-green-500 hover:cursor-pointer font-semibold py-3 transition">
            Promote a Tournament
            <IconChevronRight className="w-5 h-5 text-field-green-500" />
          </button>
        </div>
      </div>
      {/* Right: Slanted Image */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
        >
          <img
            src="/players_huddling_around_baseball_coach.webp"
            alt="Clubhouse Hero"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

export function TypewriterEffect({
  words,
  className,
  typingSpeed = 50,
  duration = 800,
  deletingSpeed = 75,
}: {
  words: string[];
  className?: string;
  typingSpeed?: number;
  duration?: number;
  deletingSpeed?: number;
}) {
  const [currentWord, setCurrentWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(typingSpeed);
 
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Current word being typed
      const word = words[currentIndex];
 
      if (!isDeleting) {
        // Typing forward
        setCurrentWord(word.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
 
        // If word is complete, pause then start deleting
        if (charIndex >= word.length) {
          setIsDeleting(true);
          setCurrentSpeed(duration); // Pause before deleting
        }
      } else {
        // Deleting
        setCurrentWord(word.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        setCurrentSpeed(deletingSpeed); // Delete faster than typing
 
        // If word is deleted, move to next word
        if (charIndex <= 1) {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % words.length);
          setCurrentSpeed(typingSpeed); // Reset typing speed
        }
      }
    }, currentSpeed);
 
    return () => clearTimeout(timeout);
  }, [
    currentWord,
    charIndex,
    currentIndex,
    isDeleting,
    currentSpeed,
    words,
    typingSpeed,
    duration,
    deletingSpeed,
  ]);
 
  return (
    <span
      className={cn(
        "relative inline-block [perspective:1000px] [transform-style:preserve-3d]",
        className,
      )}
    >
      <span>
        {currentWord.split("").map((char, index) => (
          <motion.span
            layout
            key={`${index}-${char}`}
            initial={{
              opacity: 0,
              y: 20,
              rotateY: 90,
              rotateX: 10,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotateY: 0,
              rotateX: 0,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
      <motion.span
        layoutId="cursor"
        className="absolute inline-block w-[3px] rounded-full bg-gradient-to-b from-neutral-700 via-neutral-900 to-neutral-700 dark:from-neutral-400 dark:via-neutral-100 dark:to-neutral-400"
        style={{
          height: "1em",
          bottom: "0.05em",
          marginLeft: "0.0em",
        }}
        animate={{
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: 0.1,
          opacity: {
            duration: 0.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          },
        }}
      />
    </span>
  );
}