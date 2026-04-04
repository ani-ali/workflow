"use client"
import { Position, Handle, useReactFlow } from '@xyflow/react'
import { useEffect, useRef, useState } from 'react'
import { useConnectedNodes } from '../hooks/useConnectedNodes'

export function FileUpload(props: any) {
  const { setNodes } = useReactFlow()
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string>('')
  const [fileUrl, setFileUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [receivedImageUrl, setReceivedImageUrl] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get connected nodes data
  const connectedNodes = useConnectedNodes(props.id)
  const connectedData = connectedNodes[0]?.data // Get first connected node's data

  // Watch for incoming image URLs from connected nodes
  useEffect(() => {
    if (connectedData?.imageUrl) {
      setReceivedImageUrl(connectedData.imageUrl)
      setFileUrl(connectedData.imageUrl)
    }
  }, [connectedData])

  // Update node data when file changes
  useEffect(() => {
    if (file && fileContent) {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            return {
              ...node,
              data: {
                ...node.data,
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
                fileContent: fileContent,
                text: fileContent, // For text files, make content available as text
              },
            }
          }
          return node
        })
      )
    }
  }, [file, fileContent, props.id, setNodes])

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    setIsLoading(true)
    setError(null)
    setFile(selectedFile)

    try {
      // Create object URL for preview (images, videos)
      const url = URL.createObjectURL(selectedFile)
      setFileUrl(url)

      // Read file content based on type
      const reader = new FileReader()

      reader.onload = (e) => {
        const content = e.target?.result
        if (typeof content === 'string') {
          setFileContent(content)
        } else if (content instanceof ArrayBuffer) {
          // Convert ArrayBuffer to base64 for binary files
          const base64 = btoa(
            new Uint8Array(content).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )
          setFileContent(`data:${selectedFile.type};base64,${base64}`)
        }
        setIsLoading(false)
      }

      reader.onerror = () => {
        setError('Failed to read file')
        setIsLoading(false)
      }

      // Read as text for text files, as data URL for others
      if (selectedFile.type.startsWith('text/') ||
          selectedFile.type === 'application/json' ||
          selectedFile.type === 'application/xml' ||
          selectedFile.name.endsWith('.md') ||
          selectedFile.name.endsWith('.csv')) {
        reader.readAsText(selectedFile)
      } else {
        reader.readAsDataURL(selectedFile)
      }
    } catch (err) {
      console.error('Error handling file:', err)
      setError('Failed to process file')
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!file || !fileContent) return

    // For text files, create a blob from content
    if (fileContent.startsWith('data:')) {
      // Data URL - just download as is
      const link = document.createElement('a')
      link.href = fileContent
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      // Text content - create blob
      const blob = new Blob([fileContent], { type: file.type || 'text/plain' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = () => {
    if (!file) return null

    if (file.type.startsWith('image/')) {
      return '🖼️'
    } else if (file.type.startsWith('video/')) {
      return '🎥'
    } else if (file.type.startsWith('audio/')) {
      return '🎵'
    } else if (file.type === 'application/pdf') {
      return '📄'
    } else if (file.type.includes('json')) {
      return '📊'
    } else if (file.type.includes('text')) {
      return '📝'
    } else {
      return '📎'
    }
  }

  return (
    <div className="custom-node">
      <div className="bg-[#1a1a1a] rounded-xl border border-green-700 min-w-[350px] max-w-[350px] overflow-hidden relative">
        {/* Header */}
        <div className="bg-green-900/20 px-3 py-2 border-b border-green-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-green-300 flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M13 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Image Viewer/Downloader
            </span>
            {(file || receivedImageUrl) && (
              <button
                onClick={receivedImageUrl ? () => {
                  const link = document.createElement('a')
                  link.href = receivedImageUrl
                  link.download = `image-${Date.now()}.png`
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                } : handleDownload}
                className="text-xs px-2 py-1 bg-green-700 hover:bg-green-600 text-white rounded transition-all"
                title="Download"
              >
                Download
              </button>
            )}
          </div>
        </div>

        {/* File Display Area */}
        {receivedImageUrl ? (
          <div className="p-3">
            {/* Display received image from connected node */}
            <div className="mb-3">
              <p className="text-[10px] text-gray-400 mb-2">Received from connected node:</p>
              <img
                src={receivedImageUrl}
                alt="Received image"
                className="w-full h-[200px] object-cover rounded-md"
              />
            </div>
            {/* Download button for received image */}
            <button
              onClick={() => {
                const link = document.createElement('a')
                link.href = receivedImageUrl
                link.download = `generated-image-${Date.now()}.png`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              className="w-full mt-2 text-xs px-2 py-2 bg-green-700 hover:bg-green-600 text-white rounded transition-all"
            >
              Download Image
            </button>
          </div>
        ) : file ? (
          <div className="p-3">
            {/* File Preview for uploaded files */}
            {file.type.startsWith('image/') && fileUrl && (
              <div className="mb-3">
                <img
                  src={fileUrl}
                  alt={file.name}
                  className="w-full h-[200px] object-cover rounded-md"
                />
              </div>
            )}

            {/* File Info */}
            <div className="bg-[#0a0a0a] rounded-md p-2">
              <div className="flex items-start gap-2">
                <span className="text-2xl">{getFileIcon()}</span>
                <div className="flex-1">
                  <p className="text-xs text-white font-medium truncate">{file.name}</p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Type: {file.type || 'Unknown'}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Size: {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              {/* Text Content Preview */}
              {fileContent && !fileContent.startsWith('data:') && (
                <div className="mt-2 pt-2 border-t border-gray-800">
                  <p className="text-[10px] text-gray-400 mb-1">Preview:</p>
                  <div className="bg-black rounded p-2 max-h-[100px] overflow-y-auto">
                    <pre className="text-[10px] text-green-400 whitespace-pre-wrap break-all">
                      {fileContent.substring(0, 500)}
                      {fileContent.length > 500 && '...'}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-green-700 rounded-lg p-4 text-center cursor-pointer hover:bg-green-900/10 transition-colors"
            >
              <svg
                className="mx-auto mb-2 text-green-600"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 10L12 5L17 10M12 5V15"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 15V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V15"
                />
              </svg>
              <p className="text-xs text-gray-400">Click to upload file</p>
              <p className="text-[10px] text-gray-500 mt-1">or drag and drop</p>
            </div>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="*/*"
        />

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-xs text-green-400 animate-pulse">
              Processing file...
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="px-3 pb-2">
            <div className="text-xs text-red-400">
              Error: {error}
            </div>
          </div>
        )}
      </div>

      {/* Input handle only - to receive images from other nodes */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{
          background: receivedImageUrl ? '#10b981' : '#6b7280',
          width: 12,
          height: 12,
        }}
      />
    </div>
  )
}