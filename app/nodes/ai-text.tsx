'use client'
import { Position, Handle, useUpdateNodeInternals, useReactFlow } from '@xyflow/react'
import { useAtom } from 'jotai'
import { v4 as uuid } from 'uuid'
import { edgesAtom } from '../states/edges'
import { useEffect, useRef, useState } from 'react'
import { useConnectedNodes } from '../hooks/useConnectedNodes'
import { ArrowUp, LoaderCircle } from 'lucide-react'

export function AiText(props: any) {
  const [edges] = useAtom(edgesAtom)
  const { setNodes } = useReactFlow()

  const updateNodeInternals = useUpdateNodeInternals()
  const [handles, setHandles] = useState<string[]>([uuid()])
  const [text, setText] = useState<string>('')
  const [generatedText, setGeneratedText] = useState<string>('')
  const [textChange, setTextChange] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)
  const prevEdgeCount = useRef(0)

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

  // Update node data when generated text changes
  useEffect(() => {
    if (generatedText) {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            return {
              ...node,
              data: {
                ...node.data,
                text: generatedText,
              },
            }
          }
          return node
        }),
      )
    }
  }, [generatedText, props.id, setNodes])

  const handleCopyResponse = async () => {
    if (generatedText) {
      try {
        await navigator.clipboard.writeText(generatedText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
      } catch (err) {
        console.error('Failed to copy text:', err)
        setError('Failed to copy text')
      }
    }
  }

  const handleGenerateText = async () => {
    const promptText = textChange ? text : processedData.map((v) => v?.text).join(' ')
    if (!promptText?.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsLoading(true)
    setError(null)
    setTextChange(false)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt:
            "generate medium size response don't write additional stuff only what I asked for PROMPT IS :" +
            promptText,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate text')
      }

      setGeneratedText(data.text)
    } catch (error) {
      console.error('Failed to generate text:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate text')
    } finally {
      setIsLoading(false)
    }
  }

  console.log(props)
  const displayText = text || processedData.map((v) => v?.text).join(' ')

  return (
    <div className="custom-node">
      <div className="bg-[#171717] rounded-4xl min-w-[300px] max-w-[300px] overflow-hidden relative">
        <div className="m-3 rounded-2xl min-h-96 max-h-auto bg-[#212121]">
          {isLoading ? (
            <p className="text-xs text-gray-400 font-bold px-2 py-4 animation-palse">Loading...</p>
          ) : generatedText ? (
            <p className="text-xs text-gray-400 font-bold px-2 py-4">{generatedText}</p>
          ) : (
            <div className="text-xs text-gray-400 font-bold px-2 py-4">
              Try..
              <br />
              <br />
              Ask AI to write detail prompts
              <br />
              <br />
              Combine ideas
              <br />
              <br />
              Refine the prompt
            </div>
          )}

          <div className="m-2 w-[260px] mb-5  hover:border-[0.5px] hover:border-[#454444] border border-[#363333] bottom-0 absolute p-1.5 rounded-2xl bg-[#212121] ">
            <textarea
              value={displayText}
              onChange={(e) => {
                setText(e.target.value)
                setTextChange(true)
              }}
              placeholder="Enter your prompt here or connect input nodes..."
              className="w-full bg-transparent p-2 text-white placeholder-gray-500 text-sm resize-none outline-none min-h-[120px] pr-12"
              style={{ color: displayText ? 'white' : '#6b7280' }}
              disabled={isLoading}
            />

            <button
              onClick={handleGenerateText}
              disabled={isLoading}
              className={`absolute bottom-2 right-2 rounded-full  p-2 text-xs font-medium transition-all ${
                isLoading
                  ? 'bg-white cursor-not-allowed text-black'
                  : 'bg-white hover:bg-gray-200 text-black'
              }`}
            >
              {isLoading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUp className="h-4 w-4 " />
              )}
            </button>
          </div>
        </div>
        {/* <div className="text-[8px] text-gray-500 px-2">
            Generated Response:
             <br/>
              {generatedText}
             </div>
         */}

        {/* Status indicator */}

        {error && (
          <div className="px-3 pb-2">
            <div className="text-xs text-red-400">Error: {error}</div>
          </div>
        )}
      </div>
      <div className="top-0">
        {handles.map((handleId, index) => (
          <Handle
            key={handleId}
            type="target"
            position={Position.Left}
            style={{
              marginTop: index * 30,
              width: 12,
              height: 12,
              top: 40,
              background: 'orange',
              border: '2px solid #1a1a1a',
              right: '-6px',
            }}
            id={handleId}
          >
            <span className="text-orange-400 text-xs -ml-12 -top-3.5 absolute left-2 font-bold whitespace-nowrap">
              Input {index + 1}
            </span>
          </Handle>
        ))}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          background: isLoading ? '#60a5fa' : '#10b981',
          width: 12,
          height: 12,
        }}
        ><span className="text-[#10b981] text-xs ml-2 -top-3.5 absolute left-2 font-bold whitespace-nowrap">
        Text 
      </span></Handle>
    </div>
  )
}
