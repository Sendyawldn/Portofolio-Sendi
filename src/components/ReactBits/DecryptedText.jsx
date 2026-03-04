import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const DecryptedText = ({ text, className }) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789./";
  const textArray = text.split("");

  return (
    <h2 className={cn("inline-block", className)}>
      {textArray.map((char, index) => {
        return (
          <motion.span
            key={index}
            initial={{ color: "rgba(99, 102, 241, 0)" }}
            animate={{ color: "rgba(99, 102, 241, 1)" }}
            transition={{
              delay: index * 0.05,
              duration: 0.1,
              ease: "linear",
            }}
            className="font-mono"
          >
            <motion.span
              animate={{ color: ["rgba(99, 102, 241, 1)", "#ffffff"] }}
              transition={{
                delay: index * 0.05 + 0.1,
                duration: 0.2,
                times: [0, 1],
              }}
            >
              <motion.span
                animate={{
                  innerHTML: [
                    characters[Math.floor(Math.random() * characters.length)],
                    char,
                  ],
                }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.2,
                  times: [0, 1],
                }}
              >
                {char}
              </motion.span>
            </motion.span>
          </motion.span>
        );
      })}
    </h2>
  );
};

export default DecryptedText;
