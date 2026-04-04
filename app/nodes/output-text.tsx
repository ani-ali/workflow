import { Position, Handle, useUpdateNodeInternals } from '@xyflow/react'
import { useAtom } from 'jotai'
import { v4 as uuid } from 'uuid'
import { edgesAtom } from '../states/edges'
import { useEffect, useRef, useState } from 'react'

export function OutputText(props: any) {
  const [edges] = useAtom(edgesAtom)

  const updateNodeInternals = useUpdateNodeInternals()
  const [handles, setHandles] = useState<string[]>([uuid()])
  const prevEdgeCount = useRef(0)

  const connectedEdges = edges.filter((v) => v.target === props.id)

  useEffect(() => {
    if (connectedEdges.length > prevEdgeCount.current) {
      setHandles((prev) => [...prev, uuid()])
      updateNodeInternals(props.id)
    }
    prevEdgeCount.current = connectedEdges.length
  }, [connectedEdges.length])
  console.log(props)
  return (
    <div className="custom-node">
      <div className="bg-white text-black p-10">
        <div>
        </div>
      </div>
      {handles.map((handleId, index) => (
        <Handle
          key={handleId}
          type="target"
          position={Position.Left}
          style={{ marginTop: index * 10 }}
          id={handleId}
        ></Handle>
      ))}
    </div>
  )
}
