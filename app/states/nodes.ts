import { atom } from 'jotai'

export const nodesAtom = atom([
  { id: 'n2', type: 'textInput', position: { x: 0, y: 0 }, data: { nodeId: 'n2', text: '' } },
  { id: 'n7', type: 'textInput', position: { x: 0, y: 200 }, data: { nodeId: 'n7', text: '' } },
  { id: 'n4', type: 'aiText', position: { x: 400, y: 100 }, data: { nodeId: 'n4' } },
  { id: 'n6', type: 'geminiImage', position: { x: 850, y: 100 }, data: { nodeId: 'n6' } },
  { id: 'n8', type: 'fileUpload', position: { x: 0, y: 400 }, data: { nodeId: 'n8' } },
])
