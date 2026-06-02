import React from "react";
import { motion } from "motion/react";

interface AnimatedHeadlineProps {
  id?: string;
  className?: string;
}

export default function AnimatedHeadline({ id, className = "" }: AnimatedHeadlineProps) {
  const line1 = "UNLEASH EXPONENTIAL";
  const line2Part1 = "DIGITAL";
  const line2Part2 = "GROWTH";

  // Splits plain text into words, then each word into characters
  const renderInteractiveLetters = (text: string, startDelay: number, isGradient: boolean = false) => {
    const words = text.split(" ");
    let letterCounter = 0;

    return words.map((word, wIdx) => {
      const chars = word.split("");
      return (
        <span 
          key={wIdx} 
          className="inline-block whitespace-nowrap select-none"
          style={{ marginRight: "0.22em" }}
        >
          {chars.map((char, cIdx) => {
            letterCounter++;
            // Generate delightful alternative directions (top, bottom, left, right offsets)
            // so they literally fly together to form the text beautifully.
            const angle = (letterCounter * (Math.PI / 4));
            const range = 60 + (letterCounter % 3) * 30; // 60px to 120px
            const startX = Math.cos(angle) * range;
            const startY = -120 - (letterCounter % 4) * 25; // fly from top-left, top-right, or top
            const startRotate = (letterCounter % 2 === 0 ? 1 : -1) * (25 + (letterCounter % 3) * 15);

            return (
              <motion.span
                key={cIdx}
                className={`inline-block origin-center ${isGradient ? "" : "text-white"}`}
                initial={{
                  opacity: 0,
                  x: startX,
                  y: startY,
                  scale: 0.3,
                  rotate: startRotate,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                }}
                viewport={{ once: false }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 15,
                  delay: startDelay + letterCounter * 0.035,
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      );
    });
  };

  return (
    <h1 className={className} id={id}>
      <span className="block mb-2">
        {renderInteractiveLetters(line1, 0.1, false)}
      </span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f472b6] to-[#a855f7] block">
        {renderInteractiveLetters(line2Part1, 0.65, true)}
        {" "}
        {renderInteractiveLetters(line2Part2, 0.9, true)}
      </span>
    </h1>
  );
}
