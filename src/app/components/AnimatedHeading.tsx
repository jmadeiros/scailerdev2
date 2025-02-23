"use client"

import { useEffect, useState, useRef } from "react"

export default function AnimatedHeading() {
  const [displayText, setDisplayText] = useState("")
  const texts = ["scailer", "a better way to"]
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const pauseForScailer = 5000 // Reduced from 8400 to 5000 to match Learn More button
  const pauseForBetterWay = 8000
  const [leftBracketStyle, setLeftBracketStyle] = useState({})
  const [rightBracketStyle, setRightBracketStyle] = useState({})
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const deleteText = (text: string, onComplete: () => void, pauseTime: number) => {
      const startDeletion = () => {
        let currentIndex = text.length
        const interval = setInterval(
          () => {
            if (currentIndex > 0) {
              setDisplayText((prev) => prev.slice(0, currentIndex - 1))
              currentIndex--
            } else {
              clearInterval(interval)
              setTimeout(onComplete, 200) // 200ms pause for both phrases
            }
          },
          text === "scailer" ? 60 : 30, // Slower deletion for "scailer"
        )
      }

      if (text === "scailer") {
        setTimeout(startDeletion, pauseTime) // Start deletion after pauseTime for "scailer"
      } else {
        // For "a better way to scale", wait for one full cycle
        setTimeout(startDeletion, pauseTime)
      }
    }

    const animateBrackets = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const moveDistance = containerWidth / 2
        const widthAdjustment = 17

        // Flip and swap the brackets, ending slightly wider
        setLeftBracketStyle({
          transform: `translateX(${moveDistance + widthAdjustment}px) rotateY(180deg)`,
          transition: "transform 0.5s ease-in-out",
        })
        setRightBracketStyle({
          transform: `translateX(-${moveDistance + widthAdjustment}px) rotateY(-180deg)`,
          transition: "transform 0.5s ease-in-out",
        })

        // Reset the styles after the animation and add a small pause
        setTimeout(() => {
          setLeftBracketStyle({})
          setRightBracketStyle({})
          setTimeout(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
          }, 300) // 300ms pause after flip and swap
        }, 500)
      }
    }

    const typeText = (text: string, onComplete: () => void, isFirstAnimation: boolean) => {
      let currentIndex = 0
      const interval = setInterval(
        () => {
          if (currentIndex < text.length) {
            setDisplayText((prev) => text.slice(0, currentIndex + 1))
            currentIndex++
          } else {
            clearInterval(interval)
            deleteText(
              text,
              () => {
                animateBrackets()
              },
              isFirstAnimation ? pauseForScailer : pauseForBetterWay,
            )
          }
        },
        text === "scailer" ? 100 : 50,
      )
    }

    const startAnimation = () => {
      const currentText = texts[currentTextIndex]
      typeText(currentText, () => {}, currentTextIndex === 0)
    }

    const timeout = setTimeout(startAnimation, 500)
    return () => clearTimeout(timeout)
  }, [currentTextIndex])

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes wordScroll {
        0%, 15% {
          transform: translateY(0);
        }
        25%, 40% {
          transform: translateY(-33.33%);
        }
        50%, 90% {
          transform: translateY(-66.66%);
        }
        100% {
          transform: translateY(-66.66%);
        }
      }
      .scroll-words {
        display: inline-flex;
        flex-direction: column;
        overflow: hidden;
        height: 1.35em; 
      }
      .scroll-words-inner {
        animation: wordScroll 8s cubic-bezier(0.4, 0.0, 0.2, 1) infinite; 
        display: flex;
        flex-direction: column;
      }
      .scroll-words span {
        display: flex;
        align-items: flex-start;
        height: 1.35em;
        line-height: 1;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const formatText = (text: string) => {
    if (text.toLowerCase().includes("scailer")) {
      return text.split(/(ai)/i).map((part, index) =>
        part.toLowerCase() === "ai" ? (
          <span key={index} className="text-green-500">
            {part}
          </span>
        ) : (
          part
        ),
      )
    }
    if (text.startsWith("a better way")) {
      return (
        <>
          {text}
          <div className="scroll-words text-4xl md:text-5xl lg:text-6xl ml-3 inline-flex items-baseline">
            <div className="scroll-words-inner">
              <span>build</span>
              <span>grow</span>
              <span className="font-bold">scale.</span>
            </div>
          </div>
        </>
      )
    }
    return text
  }

  return (
    <div className="text-center my-12">
      <div ref={containerRef} className="inline-flex items-center justify-center">
        <h1 className="text-7xl md:text-8xl lg:text-9xl flex items-center tracking-tight text-gray-800 font-medium whitespace-nowrap">
          <span
            className="font-light text-green-500 text-8xl md:text-9xl lg:text-[10rem] mr-4 flex items-center"
            style={{ ...leftBracketStyle, transformStyle: "preserve-3d" }}
          >
            {"{"}
          </span>
          <div className="flex items-baseline">
            <span
              className={`flex-shrink-0 transition-all duration-300 ${
                displayText.startsWith("a better way")
                  ? "text-4xl md:text-5xl lg:text-6xl"
                  : "text-7xl md:text-8xl lg:text-9xl"
              }`}
            >
              {formatText(displayText)}
            </span>
          </div>
          <span
            className="font-light text-green-500 text-8xl md:text-9xl lg:text-[10rem] ml-4 flex items-center"
            style={{ ...rightBracketStyle, transformStyle: "preserve-3d" }}
          >
            {"}"}
          </span>
        </h1>
      </div>
    </div>
  )
}

