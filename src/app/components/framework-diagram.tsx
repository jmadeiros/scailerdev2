"use client"

import { Database, Cloud, Zap, Network, Cpu, Server, Shield, ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"

const iconColors = ["#9CA3AF", "#0EA5E9", "#22C55E", "#EF4444", "#EC4899", "#F59E0B"]
const timelineColor = "#8B5CF6"

// Add the purple dot keyframes
const purpleDotKeyframes = `
  @keyframes streamDot {
    0% {
      top: -150px;
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      top: 470px;
      opacity: 0;
    }
  }
`

// Add all keyframes to the document
if (typeof document !== "undefined") {
  const style = document.createElement("style")
  style.textContent = purpleDotKeyframes
  document.head.appendChild(style)
}

const ColoredIcon = ({ icon: Icon, color }: { icon: any; color: string }) => {
  return <Icon className={`w-10 h-10`} color={color} />
}

const FeatureBox = ({
  icon: Icon,
  title,
  description,
  label,
  isLeft,
  isActive,
}: {
  icon: any
  title: string
  description: string
  label: string
  isLeft: boolean
  isActive: boolean
}) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: isActive || isHovered ? 1 : 0.5, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative bg-transparent ${isLeft ? "text-right pr-16" : "pl-16"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-[#F9FAFB] p-8">
        <div className={`flex items-center gap-2 text-gray-600 mb-4 ${isLeft ? "justify-end" : ""}`}>
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 text-[15px] leading-relaxed">{description}</p>
        <Link
          href="#"
          className={`inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors ${
            isLeft ? "flex-row-reverse" : ""
          }`}
        >
          Learn more
          <ArrowRight className={`h-4 w-4 ${isLeft ? "mr-1" : "ml-1"}`} />
        </Link>
      </div>
      <div className="h-16" />
    </motion.div>
  )
}

export default function FrameworkDiagram() {
  const features = [
    {
      icon: Database,
      label: "Vercel Data Cache",
      title: "Total control.",
      description: "Regenerate pages or cache function responses on demand, improving performance and reducing costs.",
    },
    {
      icon: Network,
      label: "Vercel Edge Network",
      title: "Accelerate your delivery.",
      description: "Every request travels through private fiber to the nearest region, ensuring optimal performance.",
    },
    {
      icon: Zap,
      label: "Vercel Functions",
      title: "Servers made simple.",
      description: "We deploy and optimize the necessary compute for any scale, replicated across 18 regions.",
    },
    {
      icon: Shield,
      label: "Vercel Firewall",
      title: "Edge-localized protection.",
      description: "L3/L4 protection at every edge location. Your site stays protected without adding latency.",
    },
  ]

  const containerRef = useRef(null)
  const timelineRef = useRef(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.1, 0.15, 0.15, 0.1])

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const featureIndex = Math.min(Math.floor(latest * features.length), features.length - 1)
      setActiveFeature(featureIndex)
    })

    return () => unsubscribe()
  }, [scrollYProgress, features.length])

  const scrollToTimeline = () => {
    if (timelineRef.current) {
      const element = timelineRef.current as HTMLElement
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const scrollToFeature = (index: number) => {
    const featureElement = featureRefs.current[index]
    if (featureElement) {
      const offset = 100 // Adjust this value to fine-tune the scroll position
      const elementPosition = featureElement.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  // Define the paths
  const paths = [
    "M100 10 C 100 10, 250 505, 600 505",
    "M300 10 C 300 10, 375 505, 600 505",
    "M500 10 C 500 10, 525 505, 600 505",
    "M700 10 C 700 10, 675 505, 600 505",
    "M900 10 C 900 10, 825 505, 600 505",
    "M1100 10 C 1100 10, 950 505, 600 505",
  ]

  return (
    <div className="w-full max-w-6xl mx-auto bg-[#F9FAFB]" ref={containerRef}>
      {/* Main diagram with icons and lines */}
      <div className="relative w-full aspect-[16/9] z-10">
        <svg viewBox="0 0 1200 675" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {paths.map((d, i) => (
              <path key={i} id={`path-${i}`} d={d} />
            ))}
          </defs>

          {/* Curved paths with smooth convergence */}
          {paths.map((d, i) => (
            <use key={i} href={`#path-${i}`} stroke={iconColors[i]} strokeWidth="3" />
          ))}

          {/* Connection circles at the bottom of each icon */}
          {[100, 300, 500, 700, 900, 1100].map((cx, i) => (
            <circle key={i} cx={cx} cy="10" r="3" fill={iconColors[i]} />
          ))}

          {/* Streaming dots for each path */}
          {paths.map((_, i) =>
            [...Array(3)].map((_, dotIndex) => (
              <circle key={`${i}-${dotIndex}`} r="4" fill={iconColors[i]}>
                <animateMotion dur="3s" repeatCount="indefinite" begin={`${dotIndex * 1}s`}>
                  <mpath href={`#path-${i}`} />
                </animateMotion>
              </circle>
            )),
          )}

          {/* Our Services button */}
          <g transform="translate(500, 485)" style={{ cursor: "pointer" }} onClick={scrollToTimeline}>
            <rect
              x="0"
              y="0"
              width="200"
              height="56"
              rx="28"
              fill="black"
              className="hover:fill-gray-800 transition-colors"
            />
            <text
              x="100"
              y="36"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontFamily="system-ui"
              className="font-medium pointer-events-none"
            >
              Our Services
            </text>
          </g>
        </svg>

        {/* Icons at the same level with connection points */}
        <div className="absolute top-[10px] transform -translate-y-1/2 inset-x-0">
          <div className="flex justify-between items-center px-12">
            {[Database, Cloud, Zap, Network, Cpu, Server].map((Icon, index) => (
              <div
                key={index}
                className="relative"
                onClick={() => scrollToFeature(index)}
                role="button"
                tabIndex={0}
                aria-label={`Scroll to ${features[index]?.label}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    scrollToFeature(index)
                  }
                }}
              >
                <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
                  <ColoredIcon icon={Icon} color={iconColors[index]} />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1 h-6 bg-gradient-to-b from-white to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline section with continuous line - adjusted positioning */}
      <div className="relative" style={{ minHeight: "800px" }}>
        {/* Continuous vertical line that extends through the entire content */}
        <div className="absolute left-1/2 top-[360px] bottom-0 w-px bg-[#eaeaea] -translate-x-1/2 z-[1]" />

        <div className="relative pt-8" ref={timelineRef}>
          {/* Animated line - adjusted positioning */}
          <motion.div
            className="absolute left-1/2 top-[-125px] w-px -translate-x-1/2 origin-top"
            style={{
              height: lineHeight,
              backgroundColor: timelineColor,
              opacity: lineOpacity,
            }}
          />

          {/* Streaming purple dots - reverted to previous version */}
          <div className="absolute left-1/2 -translate-x-[2px] z-[2]">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  width: "10px",
                  height: "10px",
                  left: "-3px",
                  animation: `streamDot 2s cubic-bezier(0.4, 0, 1, 1) infinite`,
                  animationDelay: `${i * 3}s`,
                  willChange: "top, opacity",
                  top: "-275px",
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    backgroundColor: timelineColor,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Grid layout for features */}
          <div className="relative grid grid-cols-2 gap-y-8 z-[3]">
            {features.map((feature, index) => (
              <div
                key={index}
                className={index % 2 === 0 ? "pr-8" : "pl-8"}
                ref={(el) => (featureRefs.current[index] = el)}
              >
                <FeatureBox {...feature} isLeft={index % 2 === 0} isActive={index === activeFeature} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

