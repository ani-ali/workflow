"use client"
import { Position, Handle, useUpdateNodeInternals, useReactFlow } from '@xyflow/react'
import { useAtom } from 'jotai'
import { v4 as uuid } from 'uuid'
import { edgesAtom } from '../states/edges'
import { useEffect, useRef, useState } from 'react'
import { useConnectedNodes } from '../hooks/useConnectedNodes'
import { useGeminiImage } from '../hooks/useGeminiImage'

export function GeminiImage(props: any) {
  const [edges] = useAtom(edgesAtom)
  const { setNodes } = useReactFlow()

  const updateNodeInternals = useUpdateNodeInternals()
  const [handles, setHandles] = useState<string[]>([uuid()])
  const [prompt, setPrompt] = useState<string>('')
  const [promptChange, setPromptChange] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const prevEdgeCount = useRef(0)

  // Use the Gemini image hook
  const { generateImage, isLoading, error, imageUrl, description } = useGeminiImage()

  const connectedEdges = edges.filter((v) => v.target === props.id)
  const connectedNodes = useConnectedNodes(props.id)
  const processedData = connectedNodes.map((node) => node.data)

  useEffect(() => {
    if (connectedEdges.length > prevEdgeCount.current) {
      setHandles((prev) => [...prev, uuid()])
      updateNodeInternals(props.id)
    }
    prevEdgeCount.current = connectedEdges.length
  }, [connectedEdges.length])

  // Update node data when image is generated
  useEffect(() => {
    if (imageUrl) {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            return {
              ...node,
              data: {
                ...node.data,
                imageUrl: imageUrl,
                description: description,
              },
            }
          }
          return node
        })
      )
    }
  }, [imageUrl, description, props.id, setNodes])

  const handleCopyImage = async () => {
    if (imageUrl) {
      try {
        await navigator.clipboard.writeText(imageUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy image URL:', err)
      }
    }
  }

  const handleGenerateImage = async () => {
    const promptText = promptChange ? prompt : processedData.map((v) => v?.text).join(' ')
    if (!promptText?.trim()) {
      return
    }

    setPromptChange(false)
    const result = await generateImage(promptText)

    if (result) {
      console.log('Image generated:', result);
    }
  }

  const displayPrompt = prompt || processedData.map((v) => v?.text).join(' ')

  return (
    <div className="custom-node">
      <div className="bg-[#1a1a1a] rounded-xl border border-purple-700 min-w-[350px] max-w-[350px] overflow-hidden relative">
        {/* Header */}
        <div className="bg-purple-900/20 px-3 py-2 border-b border-purple-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-purple-300 flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="8" cy="10" r="1" fill="currentColor"/>
                <path d="M3 18L8 13L11 16L16 11L21 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Gemini Image Generator
            </span>
            {imageUrl && (
              <button
                onClick={handleCopyImage}
                className="text-xs"
                title="Copy image URL"
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4 text-green-500' width="1em" height="1em" viewBox="0 0 16 16">
                    <g fill="currentColor">
                      <path d="m8 9.076l.085-.107a.751.751 0 1 0-1.171-.937L5.438 9.877L5.03 9.47a.747.747 0 0 0-1.06 0a.75.75 0 0 0 0 1.06l.407.408l.593.592a.75.75 0 0 0 1.116-.061l.522-.654h.001z" />
                      <path fillRule="evenodd" d="M12 11a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H4a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-1zM4 6.5A1.5 1.5 0 0 0 2.5 8v4A1.5 1.5 0 0 0 4 13.5h4A1.5 1.5 0 0 0 9.5 12V8A1.5 1.5 0 0 0 8 6.5zM13.5 4A1.5 1.5 0 0 0 12 2.5H8A1.5 1.5 0 0 0 6.5 4v1H8a3 3 0 0 1 3 3v1.5h1A1.5 1.5 0 0 0 13.5 8z" clipRule="evenodd" />
                    </g>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4' width="1em" height="1em" viewBox="0 0 16 16">
                    <path fill="currentColor" fillRule="evenodd" d="M12 2.5H8A1.5 1.5 0 0 0 6.5 4v1H8a3 3 0 0 1 3 3v1.5h1A1.5 1.5 0 0 0 13.5 8V4A1.5 1.5 0 0 0 12 2.5M11 11h1a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H4a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3zM4 6.5h4A1.5 1.5 0 0 1 9.5 8v4A1.5 1.5 0 0 1 8 13.5H4A1.5 1.5 0 0 1 2.5 12V8A1.5 1.5 0 0 1 4 6.5" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Generated Image Display */}
        {imageUrl && (
          <div className="p-2 bg-[#0a0a0a]">
            <img
              src={imageUrl}
              alt="Generated image"
              className="w-full rounded-md"
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
            {description && (
              <p className="text-[10px] text-gray-400 mt-2 px-1">{description.slice(0, 150)}...</p>
            )}
          </div>
        )}

        {/* Prompt Input */}
        <div className="m-2 p-1.5 rounded-md bg-[#212121] relative">
          <textarea
            value={displayPrompt}
            onChange={(e) => {setPrompt(e.target.value);setPromptChange(true)}}
            placeholder="Describe the image you want to generate..."
            className="w-full bg-transparent text-white placeholder-gray-500 text-sm resize-none outline-none min-h-[80px] pr-12"
            style={{ color: displayPrompt ? 'white' : '#6b7280' }}
            disabled={isLoading}
          />

          {/* Generate button */}
          <button
            onClick={handleGenerateImage}
            disabled={isLoading}
            className={`absolute bottom-2 right-2 rounded-full text-white p-2 text-xs font-medium transition-all ${
              isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-1">
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Creating...
              </span>
            ) : (
              'Generate'
            )}
          </button>
        </div>

        {/* Status indicator */}
        {isLoading && (
          <div className="px-3 pb-2">
            <div className="text-xs text-purple-400 animate-pulse">
              Creating image with Gemini Nano...
            </div>
          </div>
        )}

        {error && (
          <div className="px-3 pb-2">
            <div className="text-xs text-red-400">
              Error: {error}
            </div>
          </div>
        )}
      </div>

      {/* Input handles */}
      {handles.map((handleId, index) => (
        <Handle
          key={handleId}
          type="target"
          position={Position.Left}
          style={{
            marginTop: index * 30,
            width: 12,
            height: 12,
          }}
          id={handleId}
        />
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          background: isLoading ? '#9333ea' : '#7c3aed',
          width: 12,
          height: 12,
        }}
      />
    </div>
  )
}