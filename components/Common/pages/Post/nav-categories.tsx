"use client"

import { Button } from "@heroui/react"
import { Icon } from "@iconify/react"
import { useRef, useState,useEffect } from "react"
import { CategoryButton } from "@/components/Common/mirrors/category-button"
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries"

const categories = [
  {
    "en": "Following",
    "fa": "دنبال کردن",
    "ar": "متابعة"
  },
  {
    "en": "Programming",
    "fa": "برنامه‌نویسی",
    "ar": "البرمجة"
  },
  {
    "en": "Social Media",
    "fa": "رسانه‌های اجتماعی",
    "ar": "وسائل التواصل الاجتماعي"
  },
  {
    "en": "Sports",
    "fa": "ورزش",
    "ar": "الرياضة"
  },
  {
    "en": "Art",
    "fa": "هنر",
    "ar": "الفن"
  },
  {
    "en": "Comics",
    "fa": "کمیک",
    "ar": "القصص المصورة"
  },
  {
    "en": "Business",
    "fa": "کسب و کار",
    "ar": "الأعمال"
  },
  {
    "en": "Technology",
    "fa": "فناوری",
    "ar": "التكنولوجيا"
  },
  {
    "en": "Science",
    "fa": "علم",
    "ar": "العلوم"
  },
  {
    "en": "Health",
    "fa": "سلامت",
    "ar": "الصحة"
  }
]


export default function NavCategories({ dicts}: { dicts: DictsTypes}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [activeCategory, setActiveCategory] = useState("Following")
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 200
    const newScrollPosition = container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    })
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setShowLeftArrow(container.scrollLeft > 0)
    setShowRightArrow(container.scrollLeft < (container.scrollWidth - container.clientWidth))
  }
  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className="z-50 bg-white/80 border rounded-lg">
      <div className="relative flex items-center mx-auto">
        {showLeftArrow && (
          <Button
            isIconOnly
            variant="light"
            className="absolute left-0 z-20 h-full bg-gradient-to-r from-white via-white to-transparent"
            onClick={() => scroll("left")}
          >
            <Icon icon="mdi:chevron-left" className="text-xl" />
          </Button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-1 px-4 py-2 scrollbar-hide scroll-smooth"
          onScroll={handleScroll}
        >
          {categories.map((category) => (
            <CategoryButton
              key={category?.[dicts.lang]}
              label={category?.[dicts.lang]}
              isActive={category?.[dicts.lang] === activeCategory}
              onClick={() => setActiveCategory(category?.[dicts.lang])}
            />
          ))}
        </div>

        {showRightArrow && (
          <Button
            isIconOnly
            variant="light"
            className="absolute right-0 z-10 h-full bg-gradient-to-l from-white via-white to-transparent"
            onClick={() => scroll("right")}
          >
            <Icon icon="mdi:chevron-right" className="text-xl" />
          </Button>
        )}
      </div>
    </div>
  )
}

