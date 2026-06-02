import React from "react";
import { motion } from "motion/react";

interface AnimatedMetricProps {
  text: string | number;
  className?: string;
  delayOffset?: number;
}

/**
 * AnimatedMetricNumber:
 * Finds any words that contain numeric digits (e.g. "500+", "+184.2%", "5.4x", "#1")
 * and splits them into individual characters. Each character flies in from a unique,
 * random, safe direction (angle & short radius) to assemble beautifully in-place.
 */
export default function AnimatedMetricNumber({ text, className = "", delayOffset = 0 }: AnimatedMetricProps) {
  const str = String(text);
  const words = str.split(" ");

  // Helper code to check if a word contains any numbers/digits
  const hasNumber = (word: string) => /\d/.test(word);

  return (
    <span className={`inline-flex items-center gap-[0.1em] ${className}`} id="aim_animated_digits_container">
      {words.map((word, wordIdx) => {
        if (!hasNumber(word)) {
          // Plain non-numeric words don't get the individual flying animation but render cleanly
          return (
            <span key={wordIdx} className="inline-block mx-[0.15em]">
              {word}
            </span>
          );
        }

        // Animated numeric word (e.g. "+160%" or "5.4x")
        const characters = word.split("");

        return (
          <span 
            key={wordIdx} 
            className="inline-flex items-center whitespace-nowrap select-none" 
            id={`aim_animated_word_${wordIdx}`}
          >
            {characters.map((char, charIdx) => {
              // Generate distinct starting directions (offsets) but keep them close-range (20px to 45px)
              // so they always stay in bounds of their container card and are instantly visible.
              const angle = (charIdx * (Math.PI / 3)) + (wordIdx * 0.5); // deterministic-ish spread
              const distance = 25 + (charIdx % 3) * 10; // 25px, 35px, 45px offsets
              const startX = Math.cos(angle) * distance;
              const startY = Math.sin(angle) * distance;
              const startRotate = (charIdx % 2 === 0 ? 1 : -1) * (15 + (charIdx * 10)); // gentle rotations

              return (
                <motion.span
                  key={charIdx}
                  className="inline-block origin-center"
                  initial={{
                    opacity: 0,
                    x: startX,
                    y: startY,
                    scale: 0.4,
                    rotate: startRotate,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 15,
                    delay: delayOffset + charIdx * 0.04,
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
