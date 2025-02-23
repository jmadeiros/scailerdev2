"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface AnimatedWordProps {
  word: string
  delay: number
  isAlliteration: boolean
  section: number
  startAnimation: boolean
  isBold: boolean
}

const AnimatedWord = ({ word, delay, isAlliteration, section, startAnimation, isBold }: AnimatedWordProps) => {
  return (
    <motion.span
      className={`inline-block ${isBold ? "font-bold" : ""}`}
      initial={{
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
      }}
      animate={
        startAnimation
          ? {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.55,
        delay: delay,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
    >
      {word}
    </motion.span>
  )
}

interface AnimatedTextProps {
  startAnimation: boolean
}

export default function AnimatedText({ startAnimation }: AnimatedTextProps) {
  const [showButton, setShowButton] = useState(false)

  // Group words into three sections with their respective delays
  const sections = [
    // Section 1: "We automate, optimize, and accelerate"
    [
      { word: "We", delay: 0, isAlliteration: false, isBold: false },
      { word: "automate,", delay: 0.25, isAlliteration: true, isBold: true },
      { word: "optimize,", delay: 0.45, isAlliteration: true, isBold: true },
      { word: "and", delay: 0.65, isAlliteration: false, isBold: false },
      { word: "accelerate", delay: 0.8, isAlliteration: true, isBold: true },
    ],
    // Section 2: "how you attract, convert, and retain"
    [
      { word: "how", delay: 1.4, isAlliteration: false, isBold: false },
      { word: "you", delay: 1.4, isAlliteration: false, isBold: false },
      { word: "attract,", delay: 1.85, isAlliteration: true, isBold: true },
      { word: "convert,", delay: 2.05, isAlliteration: true, isBold: true },
      { word: "and", delay: 2.25, isAlliteration: false, isBold: false },
      { word: "retain", delay: 2.4, isAlliteration: true, isBold: true },
    ],
    // Section 3: "— scaling smarter, faster, and stronger"
    [
      { word: "—", delay: 3.0, isAlliteration: false, isBold: false },
      { word: "scaling", delay: 3.0, isAlliteration: false, isBold: false },
      { word: "smarter,", delay: 3.45, isAlliteration: true, isBold: true },
      { word: "faster,", delay: 3.65, isAlliteration: true, isBold: true },
      { word: "and", delay: 3.85, isAlliteration: false, isBold: false },
      { word: "stronger.", delay: 4.0, isAlliteration: true, isBold: true },
    ],
  ]

  const scrollToOptimized = () => {
    const element = document.getElementById("optimized-section")
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    if (startAnimation) {
      const timer = setTimeout(() => {
        setShowButton(true)
      }, 5500)

      return () => clearTimeout(timer)
    }
  }, [startAnimation])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: startAnimation ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="max-w-4xl mx-auto px-4 text-center mt-24"
    >
      <div className="min-h-[180px] flex flex-col items-center justify-center max-w-[95%] mx-auto">
        <p className="text-[26px] text-[#1a1a1a] leading-[1.7] tracking-[-0.01em] font-normal mb-10 font-inter">
          {sections.map((section, sectionIndex) => (
            <span key={sectionIndex}>
              {section.map((word, wordIndex) => (
                <>
                  <AnimatedWord
                    key={`${sectionIndex}-${wordIndex}`}
                    word={word.word}
                    delay={word.delay}
                    isAlliteration={word.isAlliteration}
                    section={sectionIndex}
                    startAnimation={startAnimation}
                    isBold={word.isBold}
                  />{" "}
                </>
              ))}
            </span>
          ))}
        </p>
        <div className="h-12 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showButton ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {showButton && (
              <Button
                className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6 font-inter font-medium rounded-lg"
                onClick={scrollToOptimized}
              >
                Learn more
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

