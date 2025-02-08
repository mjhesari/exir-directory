"use client"

import { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const menuItems = [
  { name: "خانه", icon: "mdi:home", href: "/" },
  { name: "بلاگ", icon: "mdi:post-outline", href: "/blog" },
  { name: "فیلتر", icon: "mdi:filter", href: "/filter" },
]

export default function MobileMenu() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<string>(pathname)

  useEffect(() => {
    setActiveTab(pathname)
  }, [pathname])

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white shadow-sm rounded-3xl lg:hidden z-[200] border">
      <div className="flex items-center justify-around relative p-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="relative" onMouseEnter={() => setActiveTab(item.href)}>
            <motion.button
              className={`p-3 rounded-full flex items-center justify-center transition-colors duration-200  ${
                activeTab === item.href
                  ? "text-primary dark:text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200"
              }`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <Icon icon={item.icon} width="28" height="28" />
              <span className="sr-only">{item.name}</span>
            </motion.button>
            {activeTab === item.href && (
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-primary dark:bg-primary-foreground rounded-full"
                layoutId="activeTab"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

