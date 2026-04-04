'use client'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { nodesAtom } from '../states/nodes'
import { v4 as uuid } from 'uuid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nodeTypes = [
  {
    type: 'textInput',
    label: 'Text Input',
    icon: '✏️',
    color: 'from-blue-500 to-blue-600',
    description: 'Input text data'
  },
  {
    type: 'aiText',
    label: 'AI Text',
    icon: '🤖',
    color: 'from-indigo-500 to-purple-600',
    description: 'Generate AI text'
  },
  {
    type: 'geminiImage',
    label: 'Image Gen',
    icon: '🎨',
    color: 'from-purple-500 to-pink-600',
    description: 'Generate images'
  },
  {
    type: 'fileUpload',
    label: 'File/Image',
    icon: '📁',
    color: 'from-green-500 to-emerald-600',
    description: 'Upload or view files'
  },
  {
    type: 'textOutput',
    label: 'Output',
    icon: '📤',
    color: 'from-orange-500 to-red-600',
    description: 'Display output'
  }
]

export function NodeSidebar() {
  const [nodes, setNodes] = useAtom(nodesAtom)
  const [isExpanded, setIsExpanded] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const pathname = usePathname()
  const isWorkflowPage = pathname === '/workflow'

  const filteredNodes = nodeTypes.filter(node =>
    node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addNode = (type: string) => {
    const newNode = {
      id: `${type}-${uuid()}`,
      type: type,
      position: {
        x: 300 + Math.random() * 200,
        y: 100 + Math.random() * 300
      },
      data: { nodeId: `${type}-${uuid()}`, text: '' }
    }
    setNodes((nds) => [...nds, newNode])
  }

  return (
    <div
      className={`relative h-full bg-gradient-to-b from-gray-900 via-gray-900 to-black border-r border-gray-800 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 ${!isExpanded && 'justify-center'}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">T</span>
            </div>
            {isExpanded && (
              <div>
                <h2 className="text-white font-semibold">Terafort</h2>
                <p className="text-xs text-gray-400">Workflow Builder</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className={`transform transition-transform ${!isExpanded && 'rotate-180'}`}
            >
              <path
                d="M15 6L9 12L15 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      {isExpanded && (
        <div className="border-b border-gray-800 p-3">
          <div className="space-y-1">
            <Link
              href="/"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === '/'
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm">Home</span>
            </Link>

            <Link
              href="/workflow"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === '/workflow'
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm">Workflow Editor</span>
            </Link>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {isExpanded && isWorkflowPage && (
        <div className="p-3 border-b border-gray-800">
          <div className="relative">
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 text-white text-sm px-3 py-2 pl-9 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            <svg
              className="absolute left-3 top-2.5 text-gray-400"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      )}

      {/* Nodes Section - Only show on workflow page */}
      {isWorkflowPage && (
        <div className="p-3">
          {isExpanded && (
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Available Nodes
            </h3>
          )}

          <div className="space-y-2">
            {filteredNodes.map((node) => (
            <button
              key={node.type}
              onClick={() => addNode(node.type)}
              className={`w-full group relative overflow-hidden rounded-lg transition-all duration-200 hover:scale-105 ${
                isExpanded ? 'p-3' : 'p-2'
              }`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${node.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

              {/* Content */}
              <div className={`relative flex items-center ${isExpanded ? 'justify-start gap-3' : 'justify-center'}`}>
                <div className={`flex items-center justify-center ${isExpanded ? 'w-10 h-10' : 'w-8 h-8'} bg-gray-800/50 rounded-lg group-hover:bg-gray-700/50 transition-colors`}>
                  <span className="text-lg">{node.icon}</span>
                </div>
                {isExpanded && (
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{node.label}</p>
                    <p className="text-xs text-gray-400">{node.description}</p>
                  </div>
                )}
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-lg border border-transparent group-hover:border-gray-600 transition-colors pointer-events-none`} />

              {/* Tooltip for collapsed state */}
              {!isExpanded && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {node.label}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      )}

      {/* Footer */}
      {isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Ready</span>
          </div>
        </div>
      )}
    </div>
  )
}