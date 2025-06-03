"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TableOfContentsItem {
  id: string
  title: string
}

interface MobileTableOfContentsProps {
  items: TableOfContentsItem[]
  activeSection: string,
  handleClickToSection :(id:string)=>void
}

export function MobileTableOfContents({ items, activeSection,handleClickToSection}: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Find the active section title
  const activeItem = items.find((item) => item.id === activeSection)
  const activeTitle = activeItem ? activeItem.title : items[0].title

  // Close the menu when a link is clicked
  const handleLinkClick = (id: string) => {
    handleClickToSection(id)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden bg-white sticky top-14 z-10 border-b border-gray-200">
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-[#8220ff]">Table of Contents</h2>
          {!isOpen && (
            <div className="text-sm text-gray-600 mt-1">
              Current: <span className="text-[#8220ff]">{activeTitle}</span>
            </div>
          )}
        </div>
        <div className="text-[#8220ff]">{isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}</div>
      </div>

      {isOpen && (
        <div className="border-t border-gray-100">
          <nav className="p-4">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`block py-3 px-4 my-1 rounded-md transition-colors ${
                  activeSection === item.id ? "bg-[#8220ff] text-white font-medium" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
