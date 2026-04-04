'use client'
import { useState, useCallback } from 'react'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Panel, Controls, Background, MiniMap } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { CustomNode } from '../nodes/text'
import { InputText } from '../nodes/input-text'
import { OutputText } from '../nodes/output-text'
import { useAtom } from 'jotai'
import { nodesAtom } from '../states/nodes'
import { edgesAtom } from '../states/edges'
import { AiText } from '../nodes/ai-text'
import { GeminiImage } from '../nodes/gemini-image'
import { FileUpload } from '../nodes/file-upload'
import { NodeSidebar } from './node-sidebar'

export default function Workflow() {
  const [nodes, setNodes] = useAtom(nodesAtom)
  const [edges, setEdges] = useAtom(edgesAtom)
  const [showMinimap, setShowMinimap] = useState(false)
  const [showGrid, setShowGrid] = useState(true)

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  )

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  )

  const onConnect = useCallback((params) => {
    setEdges((edgesSnapshot) => {
      const duplicateConnection = edgesSnapshot.find(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle &&
          edge.target === params.target &&
          edge.targetHandle === params.targetHandle,
      )

      if (duplicateConnection) {
        console.log('Connection already exists between these handles')
        return edgesSnapshot
      }

      const existingNodeConnection = edgesSnapshot.find(
        (edge) => edge.source === params.source && edge.target === params.target,
      )

      if (existingNodeConnection) {
        const filteredEdges = edgesSnapshot.filter(
          (edge) => !(edge.source === params.source && edge.target === params.target),
        )
        return addEdge(params, filteredEdges)
      }

      return addEdge(params, edgesSnapshot)
    })
  }, [])

  const nodeTypes = {
    customNode: CustomNode,
    textInput: InputText,
    textOutput: OutputText,
    aiText: AiText,
    geminiImage: GeminiImage,
    fileUpload: FileUpload,
  }

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <NodeSidebar />

      {/* Main Workflow Area */}
      <div className="flex-1 relative">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-10 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-white font-medium">Workflow Canvas</h1>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Nodes:</span>
              <span className="text-xs font-medium text-white">{nodes.length}</span>
              <span className="text-xs text-gray-400 ml-2">Edges:</span>
              <span className="text-xs font-medium text-white">{edges.length}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Grid Toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-2 rounded-lg transition-colors ${
                showGrid ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800 text-gray-400'
              } hover:bg-gray-700`}
              title="Toggle Grid"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            {/* Minimap Toggle */}
            <button
              onClick={() => setShowMinimap(!showMinimap)}
              className={`p-2 rounded-lg transition-colors ${
                showMinimap ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800 text-gray-400'
              } hover:bg-gray-700`}
              title="Toggle Minimap"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="14" width="5" height="5" fill="currentColor" />
              </svg>
            </button>

            {/* Save Button */}
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
              Save Workflow
            </button>
          </div>
        </div>

        {/* React Flow Canvas */}
        <div className="h-full pt-14">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="bg-gray-950"
            defaultEdgeOptions={{
              style: { stroke: '#4b5563', strokeWidth: 2 },
              animated: true,
            }}
          >
            {showGrid && (
              <Background
                color="#1e293b"
                variant="dots"
                gap={20}
                size={1}
              />
            )}

            <Controls
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
              showInteractive={false}
            />

            {showMinimap && (
              <MiniMap
                nodeColor={(node) => {
                  switch (node.type) {
                    case 'textInput': return '#3b82f6'
                    case 'aiText': return '#8b5cf6'
                    case 'geminiImage': return '#ec4899'
                    case 'fileUpload': return '#10b981'
                    case 'textOutput': return '#f97316'
                    default: return '#6b7280'
                  }
                }}
                className="bg-gray-900 border border-gray-800 rounded-lg"
                maskColor="rgba(0, 0, 0, 0.8)"
              />
            )}

            {/* Floating Action Panel */}
            <Panel position="bottom-center" className="mb-4">
              <div className="bg-gray-900/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-gray-800">
                <button
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  onClick={() => console.log('Run workflow')}
                  title="Run Workflow"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 3l14 9-14 9V3z" fill="#10b981" />
                  </svg>
                </button>

                <div className="w-px h-6 bg-gray-700" />

                <button
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  onClick={() => setNodes([])}
                  title="Clear Canvas"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  onClick={() => console.log('Undo')}
                  title="Undo"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 10h13a5 5 0 015 5v0a5 5 0 01-5 5H7M3 10l4-4M3 10l4 4"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  onClick={() => console.log('Redo')}
                  title="Redo"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 10H8a5 5 0 00-5 5v0a5 5 0 005 5h9m4-10l-4-4m4 4l-4 4"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}