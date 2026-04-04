import { useAtom } from 'jotai'
import { nodesAtom } from '../states/nodes'
import { edgesAtom } from '../states/edges'
import { useMemo } from 'react'

/**
 * Custom hook to get all connected node data for a given nodeId
 * @param nodeId - The ID of the node to find connections for
 * @param direction - 'source' (outgoing), 'target' (incoming), or 'both' (default)
 * @returns Array of connected node data
 */
export function useConnectedNodes(
  nodeId: string,
  direction: 'source' | 'target' | 'both' = 'both',
) {
  const [nodes] = useAtom(nodesAtom)
  const [edges] = useAtom(edgesAtom)

  const connectedNodeData = useMemo(() => {
    // Find all edges connected to this node
    const connectedEdges = edges.filter((edge) => {
      if (direction === 'source') {
        // Only outgoing connections (this node is the source)
        return edge.source === nodeId
      } else if (direction === 'target') {
        // Only incoming connections (this node is the target)
        return edge.target === nodeId
      } else {
        // Both directions
        return edge.source === nodeId || edge.target === nodeId
      }
    })

    // Get the IDs of connected nodes
    const connectedNodeIds = connectedEdges.map((edge) => {
      if (direction === 'source') {
        return edge.target
      } else if (direction === 'target') {
        return edge.source
      } else {
        // For 'both', return the other node (not the current nodeId)
        return edge.source === nodeId ? edge.target : edge.source
      }
    })

    // Remove duplicates (in case of multiple connections to same node)
    const uniqueNodeIds = [...new Set(connectedNodeIds)]

    // Get the node data for connected nodes
    const connectedNodes = uniqueNodeIds
      .map((id) => nodes.find((node) => node.id === id))
      .filter(Boolean) // Remove any undefined nodes

    return connectedNodes
  }, [nodes, edges, nodeId, direction])

  return connectedNodeData
}

/**
 * Hook to get detailed connection info including edge handles
 * @param nodeId - The ID of the node to find connections for
 * @returns Array of connection details with node data and handle information
 */
export function useConnectedNodesWithHandles(nodeId: string) {
  const [nodes] = useAtom(nodesAtom)
  const [edges] = useAtom(edgesAtom)

  const connectionsWithHandles = useMemo(() => {
    // Find all edges connected to this node
    const connectedEdges = edges.filter(
      (edge) => edge.source === nodeId || edge.target === nodeId,
    )

    // Map to detailed connection info
    const connections = connectedEdges.map((edge) => {
      const isSource = edge.source === nodeId
      const connectedNodeId = isSource ? edge.target : edge.source
      const connectedNode = nodes.find((node) => node.id === connectedNodeId)

      return {
        edge,
        connectedNode,
        direction: isSource ? 'outgoing' : 'incoming',
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
        localHandle: isSource ? edge.sourceHandle : edge.targetHandle,
        remoteHandle: isSource ? edge.targetHandle : edge.sourceHandle,
      }
    })

    return connections.filter((conn) => conn.connectedNode) // Filter out any undefined nodes
  }, [nodes, edges, nodeId])

  return connectionsWithHandles
}