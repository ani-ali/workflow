import { Position, Handle } from '@xyflow/react'

export function CustomNode() {
  return (
    <div className="custom-node">
      <div className="bg-white p-10">Custom Node Content</div>
      <Handle type="source" position={Position.Right} id="a" style={{ top: '30%' }} />
      <Handle type="source" position={Position.Right} id="b" style={{ top: '70%' }} />
    </div>
  )
}
