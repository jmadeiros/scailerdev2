"use client"

import { useEffect, useRef, useState } from "react"
import AnimatedHeading from "./components/AnimatedHeading"
import AnimatedText from "./components/animated-text"
import { NavMenu } from "./components/navigation/nav-menu"
import { Button } from "@/components/ui/button"
import { motion, useAnimation, useInView } from "framer-motion"
import FrameworkDiagram from "./components/framework-diagram"

export default function Home() {
  const introRef = useRef(null)
  const isIntroInView = useInView(introRef, { once: true, amount: 0.3 })
  const introControls = useAnimation()
  const [startTextAnimation, setStartTextAnimation] = useState(false)

  useEffect(() => {
    if (isIntroInView) {
      introControls.start("visible")
    }
  }, [isIntroInView, introControls])

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTextAnimation(true)
    }, 1000) // Reduced from 2000 to 1000

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <span className="bracket text-2xl">{`{`}</span>
              <div className="text-xl font-semibold mx-1">scailer</div>
              <span className="bracket text-2xl">{`}`}</span>
            </div>
            <div className="hidden md:block">
              <NavMenu />
            </div>
          </div>
          <Button className="bg-gray-900 hover:bg-gray-800">Try for free</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <AnimatedHeading />
        <AnimatedText startAnimation={startTextAnimation} />
      </section>

      {/* Intro Section */}
      <motion.section
        id="optimized-section"
        ref={introRef}
        initial="hidden"
        animate={introControls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
        }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Customisable, automated workflows
            <br />
            to scale your ops.
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
            Leverage our precision-engineered, intelligent automation frameworks to deliver your business at scale,
            without added infrastructure overhead.
          </p>

          {/* Framework Diagram */}
          <div className="relative max-w-4xl mx-auto">
            <FrameworkDiagram />
          </div>
        </div>
      </motion.section>
    </div>
  )
}

