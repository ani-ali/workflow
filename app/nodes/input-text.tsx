import { Position, Handle } from '@xyflow/react'
import { useState } from 'react'
import { nodesAtom } from '../states/nodes'
import { useAtom } from 'jotai'
export function InputText(props) {
  const [nodes, setNodes] = useAtom(nodesAtom)
  const text = nodes.find((v) => v.id == props.id)?.data?.text || ''
  const setText = (v) => {

    const setnode = nodes.map((node) => {
      if (node.id == props.id) {
        return {
          ...node,
          data: {
            ...node.data,
            text: v
          }
        }
      }
      return node
    })

    setNodes(setnode)

  }

  return (
    <div className="custom-node relative">
      <span className="text-white text-sm ml-1">Prompt 1</span>
      <div className="bg-bg rounded-xl  min-w-[350px] overflow-hidden">
        <div className="m-2 p-1.5 rounded-md bg-inner">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full bg-transparent text-white placeholder-gray-500 text-sm resize-none outline-none min-h-[120px]"
            style={{ color: text ? 'white' : '#6b7280' }}
          />
        </div>
      </div>

      {/* Right handle with label */}
      <div className="absolute right-0 top-12 -translate-y-1/2 flex items-center">
        <span className="text-cyan-400 text-xs ml-2 -top-5 absolute left-2 font-bold whitespace-nowrap">
          Prompt
        </span>
        <Handle
          type="source"
          position={Position.Right}
          id={`output-text`}
          className="w-3 h-3"
          style={{
            background: '#3b82f6',
            border: '2px solid #1a1a1a',
            right: '-6px',
            width: 12,
            height: 12,
            position: 'relative',
          }}
        />
      </div>
    </div>
  )
}
