import { NodeSidebar } from './components/node-sidebar'
import Link from 'next/link'
import Sidebar from './components/sidebar'
import Render from './components/render'

export default function Home() {
  return (
  <div className="flex w-full h-full">
        <Sidebar />
        <div>
          <Render />
        </div>
    </div>
  )
}
