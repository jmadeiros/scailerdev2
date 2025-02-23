"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Settings, Zap, LineChart, Users, Code, Database } from "lucide-react"
import type React from "react" // Import React

const whatWeDoItems = [
  {
    title: "Lead Generation",
    description: "Build a steady pipeline of high-quality leads with our proven strategies.",
    icon: Users,
  },
  {
    title: "Overview",
    description: "Learn about our approach to scaling businesses effectively.",
    icon: LineChart,
  },
  {
    title: "Features",
    description: "Explore the tools and technologies that power our solutions.",
    icon: Zap,
  },
]

const servicesItems = [
  {
    title: "Development",
    description: "Custom software development tailored to your needs.",
    icon: Code,
  },
  {
    title: "Infrastructure",
    description: "Scalable cloud infrastructure and DevOps solutions.",
    icon: Database,
  },
  {
    title: "Consulting",
    description: "Expert guidance on technology strategy and implementation.",
    icon: Settings,
  },
]

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-600 bg-transparent">What We Do</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              {whatWeDoItems.map((item) => (
                <ListItem key={item.title} title={item.title} icon={item.icon}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-600 bg-transparent">Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              {servicesItems.map((item) => (
                <ListItem key={item.title} title={item.title} icon={item.icon}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = ({
  className,
  title,
  children,
  icon: Icon,
  ...props
}: {
  className?: string
  title: string
  children: React.ReactNode
  icon: any
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 focus:bg-gray-50",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            <Icon className="h-4 w-4" />
            <span>{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-600 mt-1">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}

