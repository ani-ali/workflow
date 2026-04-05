'use client'
import { useState, useCallback } from 'react'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Panel, Controls, Background, BackgroundVariant } from '@xyflow/react'
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
import { v4 as uuid } from 'uuid'
import { BottomBar } from './bottom-bar'

export default function Render() {
  const [nodes, setNodes] = useAtom(nodesAtom)
  const [edges, setEdges] = useAtom(edgesAtom)

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  )

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  )
  const onConnect = useCallback((params) => {
    // Allow multiple connections per handle, but prevent duplicate connections between same node pairs
    setEdges((edgesSnapshot) => {
      // Check if this exact connection already exists
      const duplicateConnection = edgesSnapshot.find(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle &&
          edge.target === params.target &&
          edge.targetHandle === params.targetHandle,
      )

      // If duplicate exists, don't add it again
      if (duplicateConnection) {
        console.log('Connection already exists between these handles')
        return edgesSnapshot
      }

      // Check if there's already a different connection between these two nodes
      // (different handles but same nodes)
      const existingNodeConnection = edgesSnapshot.find(
        (edge) => edge.source === params.source && edge.target === params.target,
      )

      if (existingNodeConnection) {
        // Remove the old connection between these nodes and add the new one
        const filteredEdges = edgesSnapshot.filter(
          (edge) => !(edge.source === params.source && edge.target === params.target),
        )
        return addEdge(params, filteredEdges)
      }

      // No existing connection between these nodes, add the new edge
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

  const addFileUploadNode = () => {
    const newNode = {
      id: `file-${uuid()}`,
      type: 'fileUpload',
      position: {
        x: Math.random() * 500,
        y: Math.random() * 300
      },
      data: { nodeId: `file-${uuid()}` }
    }
    setNodes((nds) => [...nds, newNode])
  }
  return (
    <div className="w-full" style={{ width: '94.7vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Panel
          position="bottom-center"
        >
          
          <BottomBar/>
        </Panel>
        <Background color="#ccc" variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  )
}
