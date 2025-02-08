"use client"

import { cn } from "@/utils/lib/utils"

interface CategoryButtonProps {
  label: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function CategoryButton({ label, isActive = false, onClick, className }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full transition-colors duration-200",
        "text-sm font-medium whitespace-nowrap",
        isActive ? "bg-gray-400 text-white" : "text-gray-500 hover:text-secondary-900 hover:bg-gray-100",
        className,
      )}
    >
      {label}
    </button>
  )
}

