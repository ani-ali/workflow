'use client'

import {
  Play,
  Clipboard,
  Users,
  Download,
  ChevronDown,
  RotateCcw,
  RotateCw,
} from 'lucide-react'
import { useState } from 'react'

interface ToolbarItem {
  id: string
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

export function BottomBar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [percentage, setPercentage] = useState(54)

  const items: ToolbarItem[] = [
    {
      id: 'play',
      icon: <Play className="w-5 h-5 fill-current" />,
      label: 'Run',
      onClick: () => console.log('Run clicked'),
    },
    {
      id: 'clipboard',
      icon: <Clipboard className="w-4 h-4" />,
      label: 'Copy',
      onClick: () => console.log('Copy clicked'),
    },
    {
      id: 'users',
      icon: <Users className="w-4 h-4" />,
      label: 'Share',
      onClick: () => console.log('Share clicked'),
    },
    {
      id: 'download',
      icon: <Download className="w-4 h-4" />,
      label: 'Download',
      onClick: () => console.log('Download clicked'),
    },
  ]

  const secondaryItems: ToolbarItem[] = [
    {
      id: 'undo',
      icon: <RotateCcw className="w-4 h-4" />,
      label: 'Undo',
      onClick: () => console.log('Undo clicked'),
    },
    {
      id: 'redo',
      icon: <RotateCw className="w-4 h-4" />,
      label: 'Redo',
      onClick: () => console.log('Redo clicked'),
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center pb-6">
      <div className="bg-neutral-900 rounded-full px-4 py-3 flex items-center gap-4 border border-neutral-800 shadow-xl">
        {/* Primary Button with Circle Background */}
        <div className="relative group">
          <button className="bg-white text-black rounded-full p-2.5 hover:bg-neutral-100 transition-colors">
            <Play className="w-5 h-5 fill-current" />
          </button>
          {hoveredItem === 'play' && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-700 text-white text-xs rounded whitespace-nowrap">
              Run
            </div>
          )}
          <button
            onMouseEnter={() => setHoveredItem('play')}
            onMouseLeave={() => setHoveredItem(null)}
            className="absolute inset-0 rounded-full"
            aria-label="Run"
          />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-neutral-700" />

        {/* Main Actions */}
        <div className="flex items-center gap-3">
          {items.slice(1).map((item) => (
            <div key={item.id} className="relative group">
              <button
                onClick={item.onClick}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="text-neutral-400 hover:text-white transition-colors p-2"
                aria-label={item.label}
              >
                {item.icon}
              </button>
              {hoveredItem === item.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-700 text-white text-xs rounded whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-neutral-700" />

        {/* Percentage Selector */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-300 text-sm font-medium">{percentage}%</span>
          <button className="text-neutral-400 hover:text-white transition-colors p-1">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-neutral-700" />

        {/* Secondary Actions */}
        <div className="flex items-center gap-3">
          {secondaryItems.map((item) => (
            <div key={item.id} className="relative group">
              <button
                onClick={item.onClick}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="text-neutral-400 hover:text-white transition-colors p-2"
                aria-label={item.label}
              >
                {item.icon}
              </button>
              {hoveredItem === item.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-700 text-white text-xs rounded whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
