'use client'

import { useState } from 'react'
import {
  Package,
  Settings,
  Users,
  Wand2,
  Play,
  Edit2,
  Mic2,
  Expand,
} from 'lucide-react'

import { Home, Assets, video, Image, Workflow, Edit, More, Logo } from './components/index'

export default function SideBar() {
  const [expanded, setExpanded] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)

  // ✅ CLEAN MENU
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'assets', icon: Assets, label: 'Assets' },
    { id: 'image', icon: Image, label: 'Image', type: 'image' },
    { id: 'video', icon: video, label: 'Video', type: 'video' },
    { id: 'workflow', icon: Workflow, label: 'Workflow' },
    { id: 'edit', icon: Edit, label: 'Edit', type: 'edit' },
  ]

  
  const imageToolsData = {
      tools: [
        {
          id: 'create-image',
          icon: Image,
          title: 'Create Image',
          description: 'Generate AI images',
        },
        {
          id: 'edit-image',
          icon: Edit2,
          title: 'Edit Image',
          description: 'Seamless alterations',
        },
        {
          id: 'personalize',
          icon: Users,
          title: 'Personalize',
          description: 'Reference characters',
        },
        {
          id: 'style-ref',
          icon: Settings,
          title: 'Style Reference',
          description: 'Upload Image References',
        },
        {
          id: 'inpaint',
          icon: Edit2,
          title: 'Inpaint',
          description: 'Precise editing with selection',
        },
        {
          id: 'upscale',
          icon: Expand,
          title: 'Upscale',
          description: 'Enhance the details',
        },
        {
          id: 'ai-clothes',
          icon: Package,
          title: 'AI Clothes Changer',
          description: 'TryOn Outfits Instantly',
        },
        {
          id: 'background',
          icon: Image,
          title: 'Background Changer',
          description: 'Replace image backgrounds',
        },
      ],
      models: [
        {
          id: 'nano-banana-2',
          icon: Image,
          title: 'Nano Banana 2',
          badge: 'NEW',
          description: "Google's latest model",
        },
        {
          id: 'seedream-lite',
          icon: Image,
          title: 'Seedream v5.0 Lite',
          badge: 'NEW',
          description: 'Advanced image editing',
        },
        {
          id: 'imagineart-1.5',
          icon: Image,
          title: 'ImagineArt 1.5',
          badge: 'BEST',
          badgeColor: 'purple',
          description: 'Top-ranked realistic model',
        },
        {
          id: 'nano-banana-pro',
          icon: Image,
          title: 'Nano Banana Pro',
          badge: 'HOT',
          badgeColor: 'red',
          description: "Google's best image gen model",
        },
        {
          id: 'gpt-image-1.5',
          icon: Image,
          title: 'GPT Image 1.5',
          description: "Open AI's latest model",
        },
        {
          id: 'flux-2-pro',
          icon: Image,
          title: 'Flux.2 Pro',
          description: 'Extreme detailing & speed',
        },
        {
          id: 'imagen-4',
          icon: Image,
          title: 'Imagen 4',
          description: 'Incredible Prompt adherence',
        },
      ],
    }

  const videoToolsData = {
      tools: [
        {
          id: 'create-video',
          icon: Play,
          title: 'Create Videos',
          description: 'Generate AI videos',
        },
        {
          id: 'animate-image',
          icon: Wand2,
          title: 'Animate Images',
          description: 'Add motion to images',
        },
        {
          id: 'lipsync',
          icon: Mic2,
          title: 'Lipsync Studio',
          description: 'Create Talking Videos',
        },
        {
          id: 'video-extend',
          icon: Expand,
          title: 'Video Extend',
          description: 'Extend video duration',
        },
        {
          id: 'video-edit',
          icon: video,
          title: 'Video Edit',
          description: 'Edit video with prompts',
        },
        {
          id: 'ref-img-video',
          icon: Play,
          title: 'Reference Img to Video',
          description: 'Powered by Kling o1',
        },
        {
          id: 'ref-video-video',
          icon: video,
          title: 'Reference Video to Video',
          description: 'Powered by Kling o1',
        },
        {
          id: 'motion-control',
          icon: video,
          title: 'Motion Control',
          description: 'Control camera & movement',
        },
      ],
      models: [
        {
          id: 'kling',
          icon: video,
          title: 'Kling 3.0 Pro',
          badge: 'NEW',
          description: "Kling's Latest Model",
        },
        {
          id: 'runway',
          icon: video,
          title: 'Runway 4.5',
          badge: 'NEW',
          description: 'Latest Runway Video Model',
        },
        {
          id: 'seedance',
          icon: video,
          title: 'Seedance 1.5 Pro',
          description: 'Synced audio-visual output',
        },
        {
          id: 'wan',
          icon: video,
          title: 'Wan 2.6',
          badge: 'NEW',
          description: "Alibaba's latest model",
        },
        {
          id: 'veo',
          icon: video,
          title: 'Google VEO 3.1',
          description: 'Next-gen video generation',
        },
        {
          id: 'pixverse',
          icon: video,
          title: 'Pixverse V5.5',
          description: 'Consistent creation with styles',
        },
        {
          id: 'hailuo',
          icon: video,
          title: 'Hailuo 2.3 Pro',
          description: 'Hyper-realistic generation',
        },
      ],
    }

    const editToolsData = {
        tools: [
          {
            id: 'edit-image',
            icon: Edit2,
            title: 'Edit Image',
            description: 'Edit using reference image',
          },
          {
            id: 'edit-video',
            icon: video,
            title: 'Edit Video',
            description: 'Edit video with prompts',
          },
          {
            id: 'inpaint',
            icon: Edit2,
            title: 'Inpaint',
            description: 'Precise editing with selection',
          },
          {
            id: 'image-upscale',
            icon: Expand,
            title: 'Image Upscale',
            description: 'Upscale your assets',
          },
        ],
        models: [
          {
            id: 'nano-banana-pro',
            icon: Image,
            title: 'Nano Banana Pro',
            badge: 'HOT',
            badgeColor: 'red',
            description: 'Next-level multi-image editing',
          },
          {
            id: 'gpt-image-1.5',
            icon: Image,
            title: 'GPT Image 1.5',
            badge: 'NEW',
            description: "Open AI's latest image model",
          },
          {
            id: 'seedream-v4.5',
            icon: Image,
            title: 'Seedream v4.5',
            description: 'Advanced image creation',
          },
          {
            id: 'flux-2-pro',
            icon: Image,
            title: 'Flux.2 Pro',
            description: 'Extreme detailed edits in ultra-speed',
          },
        ],
      }

  const getActiveData = (item) => {
    if (item.type === 'image') return imageToolsData
    if (item.type === 'video') return videoToolsData
    if (item.type === 'edit') return editToolsData
    return null

  }

  return (
    <nav
      className="relative bg-[#0A0A0A]  h-screen flex flex-col"
      onMouseLeave={() => {
        setExpanded(null)
        setHoveredItem(null)
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20">
        <Logo className="w-6 h-6" />
      </div>

      {/* MENU */}
      <div className="space-y-4 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isHovered = hoveredItem === item.id
          const activeData = getActiveData(item)

          return (
            <div key={item.id} className="flex justify-center  p-1">
              <button
                onMouseEnter={() => {
                  setHoveredItem(item.id)
                  if (activeData) setExpanded(item.id)
                }}
                className="w-full"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="p-2 rounded-xl"
                    style={{
                      backgroundColor: isHovered ? '#292929' : 'transparent',
                    }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-[12px]">{item.label}</span>
                </div>
              </button>

              {activeData && expanded === item.id && (
                <div
                  className="absolute left-full top-0 ml-3 w-[620px] rounded-2xl 
                  bg-[#111]/90 backdrop-blur-xl border border-white/10 
                  shadow-2xl z-50"
                >
                  <div className="px-6 py-4 border-b border-white/10">
                    <h2 className="text-white font-semibold">
                      {item.label} Apps
                    </h2>
                  </div>

                  <div className="p-6 grid grid-cols-2 gap-8">
                    {/* LEFT */}
                    <div>
                      <h3 className="text-gray-400 text-[16px] mb-3">Features</h3>
                      {activeData.tools.map((tool) => {
                        const ToolIcon = tool.icon
                        return (
                          <button key={tool.id} className="flex gap-3 p-2 item-center   hover:bg-white/5 rounded w-full">
                           <div className='flex justify-center items-center bg-white/5 p-3 rounded-md  '><ToolIcon className="w-4 h-4 text-gray-300" /></div> 
                            <div className='text-start'>
                              <p className="text-white text-md ">{tool.title}</p>
                              <p className="text-gray-400 text-sm">{tool.description}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* RIGHT */}
                    <div>
                      <h3 className="text-gray-400 text-[16px] mb-3">Models</h3>
                      {activeData.models.map((tool) => {
                        const ToolIcon = tool.icon
                        return (
                          <button key={tool.id} className="flex gap-3 p-2 hover:bg-white/5 rounded">
                                                       <div className='flex justify-center items-center bg-white/5 p-3 rounded-md  '><ToolIcon className="w-4 h-4 text-gray-300" /></div> 

                            <div className='text-start'>
                              <div className="flex gap-2 items-center">
                                <p className="text-white text-md ">{tool.title}</p>
                                {tool.badge && (
                                  <span className="text-[9px] bg-purple-500 px-1 rounded">
                                    {tool.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-400 text-sm">{tool.description}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* MORE */}
      <div className="flex justify-center pb-4">
        <More className="w-5 h-5 text-white" />
      </div>
    </nav>
  )
}