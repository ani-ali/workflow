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

  const menuItems = [
    {
      id: 'home',
      icon: Home,
      label: 'Home',
      submenu: null,
      showPopup: false,
    },
    {
      id: 'assets',
      icon: Assets,
      label: 'Assets',
      submenu: null,
      showPopup: false,
    },
    {
      id: 'Image',
      icon: Image,
      label: 'Image',
      submenu: null,
      showPopup: true,
    },
    {
      id: 'video',
      icon: video,
      label: 'Video',
      submenu: null,
      showPopup: true,
    },
    {
      id: 'workflow',
      icon: Workflow,
      label: 'Workflow',
      submenu: null,
      showPopup: false,
    },
    {
      id: 'Edit',
      icon: Edit,
      label: 'Edit',
      submenu: null,
      showPopup: true,
    },
  ]

  // IMAGE TOOLS DATA
  const imageToolsData = {
    imageTools: [
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

  // VIDEO TOOLS DATA
  const videoToolsData = {
    videoTools: [
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

  // EDIT TOOLS DATA
  const editToolsData = {
    editTools: [
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

  // Render Popup for Image, Video, Edit
  const renderToolsPopup = (toolsData, sectionTitle) => {
    const hasTools = toolsData.editTools || toolsData.videoTools
    const tools = toolsData.editTools || toolsData.videoTools || toolsData.imageTools
    const models = toolsData.models

    return (
      <div
        onMouseLeave={() => {
          setExpanded(null)
          setHoveredItem(null)
        }}
        className="h-screen absolute left-full top-0 ml-3 w-[520px] rounded-2xl  bg-[#111111]/90 backdrop-blur-xl border border-white/10  shadow-2xl shadow-black/60 z-50 
animate-in fade-in slide-in-from-left-2 duration-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-[15px] font-semibold text-white">{sectionTitle}</h2>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-2 gap-10">
          {/* LEFT - Tools */}
          <div>
            <h3 className="text-[12px] text-gray-400 uppercase tracking-wider mb-4">
              {hasTools ? 'Features' : 'Tools'}
            </h3>

            <div className="space-y-3">
              {tools.map((tool, idx) => {
                const ToolIcon = tool.icon

                return (
                  <button
                    key={tool.id}
                    className="w-full flex items-start gap-3 p-2 rounded-lg 
          transition-all duration-200 
          hover:bg-white/5"
                    style={{
                      animation: `slideInMenu 0.25s ease-out ${idx * 0.04}s both`,
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-9 h-9 flex items-center justify-center 
          rounded-md bg-white/5 border border-white/10 flex-shrink-0"
                    >
                      <ToolIcon className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                    </div>

                    {/* Text */}
                    <div className="text-left">
                      <h4 className="text-[13px] font-medium text-white leading-none mb-1">
                        {tool.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-snug">{tool.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* RIGHT - Models */}
          <div>
            <h3 className="text-[12px] text-gray-400 uppercase tracking-wider mb-4">Models</h3>

            <div className="space-y-3">
              {models.map((model, idx) => {
                const ModelIcon = model.icon

                return (
                  <button
                    key={model.id}
                    className="w-full flex items-start gap-3 p-2 rounded-lg 
          transition-all duration-200 
          hover:bg-white/5"
                    style={{
                      animation: `slideInMenu 0.25s ease-out ${idx * 0.04}s both`,
                    }}
                  >
                    {/* Icon with Badge */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-9 h-9 flex items-center justify-center 
            rounded-md bg-white/5 border border-white/10"
                      >
                        <ModelIcon className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                      </div>
                      {model.badge && (
                        <span
                          className={`absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-bold rounded text-white text-center min-w-[2.5rem] ${
                            model.badgeColor === 'purple'
                              ? 'bg-purple-600'
                              : model.badgeColor === 'red'
                                ? 'bg-red-600'
                                : 'bg-lime-500 text-black'
                          }`}
                        >
                          {model.badge}
                        </span>
                      )}
                    </div>

                    {/* Text */}
                    <div className="text-left">
                      <h4 className="text-[13px] font-medium text-white leading-none mb-1">
                        {model.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-snug">{model.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <nav
      className="relative bg-[#0F0F0F] h-screen flex flex-col transition-all duration-300 font-sans text-base leading-6 font-normal"
      onMouseLeave={() => {
        setExpanded(null)
        setHoveredItem(null)
      }}
    >
      {/* Logo/Header */}
      <div className="flex items-center justify-center h-20 pb-2">
        <div className=" rounded-lg flex items-center justify-center">
          <Logo className="w-6 h-6 " />
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-6 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isHovered = hoveredItem === item.id
          const showPopup = item.showPopup

          return (
            <div key={item.id} className="flex justify-center items-center relative ">
              <button
                onMouseEnter={() => {
                  setHoveredItem(item.id)
                  if (showPopup) setExpanded(item.id)
                }}
                className="relative w-full group"
              >
                <div className="mb-1 flex flex-col items-center justify-center w-20 h-12 rounded-lg transition-all duration-200 text-gray-400  relative z-10">
                  <div
                    className="flex justify-center items-center flex-col p-2.5 space-y-1 rounded-xl"
                    style={{
                      backgroundColor: isHovered ? '#292929' : 'transparent',
                    }}
                  >
                    <Icon className="w-5 h-5 text-white " />
                  </div>
                  <span className="text-white text-[12px]">{item.label}</span>
                </div>
              </button>

              {/* POPUP FOR IMAGE */}
              {item.id === 'Image' &&
                expanded === item.id &&
                renderToolsPopup(imageToolsData, 'Image Tools')}

              {/* POPUP FOR VIDEO */}
              {item.id === 'video' &&
                expanded === item.id &&
                renderToolsPopup(videoToolsData, 'Video Tools')}

              {/* POPUP FOR EDIT */}
              {item.id === 'Edit' &&
                expanded === item.id &&
                renderToolsPopup(editToolsData, 'Edit Tools')}
            </div>
          )
        })}
      </div>

      {/* More Button */}
      <div>
        <button
          className="w-full flex items-center justify-center h-12  transition-colors"
          onMouseEnter={() => setHoveredItem('more')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="mb-1 flex flex-col items-center justify-center w-20 h-12 rounded-lg transition-all duration-200 text-gray-400  relative z-10">
            <div className="flex justify-center items-center flex-col p-2 space-y-1 rounded-md hover:bg-[#292929]">
              <More className="w-5 h-5 text-white " />
            </div>
            <span className="text-white text-[13px]">More</span>
          </div>
        </button>
      </div>
    </nav>
  )
}













 <div>
       image  
      <div className="space-y-6 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isHovered = hoveredItem === item.id
          const hasSubmenu = !!item.submenu
          const showImagineArt = item.showImagineArt
          const showvideoArt = item.showvideoArt


          return (
            <div key={item.id} className="flex justify-center items-center ">
              {/* Main Menu Item */}
              <button
                onMouseEnter={() => {
                  setHoveredItem(item.id)
                  if (hasSubmenu || showImagineArt || showvideoArt) setExpanded(item.id)
                }}
                className="relative w-full group"
              >
                <div className="mb-1 flex flex-col items-center justify-center w-20 h-12 rounded-lg transition-all duration-200 text-gray-400  relative z-10">
                  {' '}
                  <div
                    className="flex justify-center items-center flex-col p-2.5 space-y-1 rounded-xl"
                    style={{
                      backgroundColor: isHovered ? '#292929' : 'transparent',
                    }}
                  >
                    <Icon className="w-5 h-5 text-white " />
                  </div>
                  <span className="text-white text-[12px]">{item.label}</span>
                </div>

                <div
                  className={`absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium transition-all duration-200 pointer-events-none ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`}
                ></div>

                {(hasSubmenu || showImagineArt) && (
                  <div
                    className={`absolute right-2 top-1/2 -translate-y-1/2 transition-transform duration-200 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  ></div>
                )}
              </button>

              {hasSubmenu && expanded === item.id && (
                <div
                  onMouseLeave={() => {
                    setExpanded(null)
                    setHoveredItem(null)
                  }}
                  className="absolute left-full top-0 ml-2 w-56 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-sm z-50 animate-in fade-in slide-in-from-left-2 duration-200"
                >
                  {/* Submenu Header */}
                  <div className="px-4 py-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Icon className="w-4 h-4 text-purple-400" />
                      {item.label}
                    </h3>
                  </div>

                 
                </div>
              )}

              {showImagineArt && expanded === item.id && (
                <div
                  onMouseLeave={() => {
                    setExpanded(null)
                    setHoveredItem(null)
                  }}
                  className="absolute left-full top-0 ml-3 w-[520px] rounded-2xl 
  bg-[#111111]/90 backdrop-blur-xl border border-white/10 
  shadow-2xl shadow-black/60 z-50 
  animate-in fade-in slide-in-from-left-2 duration-200"
                >
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-white/10">
                    <h2 className="text-[15px] font-semibold text-white">ImagineArt Apps</h2>
                  </div>

                  {/* Content */}
                  <div className="p-6 grid grid-cols-2 gap-10">
                    {/* LEFT - Image Tools */}
                    <div>
                      <h3 className="text-[12px] text-gray-400 mb-4">Image Tools</h3>

                      <div className="space-y-3">
                        {imageToolsData.imageTools.map((tool, idx) => {
                          const ToolIcon = tool.icon

                          return (
                            <button
                              key={tool.id}
                              className="w-full flex items-start gap-3 p-2 rounded-lg 
              transition-all duration-200 
              hover:bg-white/5"
                              style={{
                                animation: `slideInMenu 0.25s ease-out ${idx * 0.04}s both`,
                              }}
                            >
                              {/* Icon */}
                              <div
                                className="w-9 h-9 flex items-center justify-center 
              rounded-md bg-white/5 border border-white/10"
                              >
                                <ToolIcon className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                              </div>

                              {/* Text */}
                              <div className="text-left">
                                <h4 className="text-[13px] font-medium text-white leading-none mb-1">
                                  {tool.title}
                                </h4>
                                <p className="text-[11px] text-gray-400 leading-snug">
                                  {tool.description}
                                </p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* RIGHT - Video Tools */}
                    <div>
                      <h3 className="text-[12px] text-gray-400 mb-4">Video tools</h3>

                      <div className="space-y-3">
                        {imageToolsData.models.map((tool, idx) => {
                          const ToolIcon = tool.icon

                          return (
                             <button
                              key={tool.id}
                              className="w-full flex items-start gap-3 p-2 rounded-lg 
              transition-all duration-200 
              hover:bg-white/5"
                              style={{
                                animation: `slideInMenu 0.25s ease-out ${idx * 0.04}s both`,
                              }}
                            >
                              {/* Icon */}
                              <div
                                className="w-9 h-9 flex items-center justify-center 
              rounded-md bg-white/5 border border-white/10"
                              >
                                <ToolIcon className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                              </div>

                              {/* Text */}
                              <div className="text-left">
                                <h4 className="text-[13px] font-medium text-white leading-none mb-1">
                                  {tool.title}
                                </h4>
                                <p className="text-[11px] text-gray-400 leading-snug">
                                  {tool.description}
                                </p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

       video 
      <div className="space-y-6 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isHovered = hoveredItem === item.id
          const hasSubmenu = !!item.submenu
          const showvideoArt = item.showvideoArt

          return (
            <div key={item.id} className="flex justify-center items-center ">
              {/* Main Menu Item */}
              <button
                onMouseEnter={() => {
                  setHoveredItem(item.id)
                  if (hasSubmenu || showvideoArt) setExpanded(item.id)
                }}
                className="relative w-full group"
              >
                <div className="mb-1 flex flex-col items-center justify-center w-20 h-12 rounded-lg transition-all duration-200 text-gray-400  relative z-10">
                  {' '}
                  <div
                    className="flex justify-center items-center flex-col p-2.5 space-y-1 rounded-xl"
                    style={{
                      backgroundColor: isHovered ? '#292929' : 'transparent',
                    }}
                  >
                    <Icon className="w-5 h-5 text-white " />
                  </div>
                  <span className="text-white text-[12px]">{item.label}</span>
                </div>

                <div
                  className={`absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium transition-all duration-200 pointer-events-none ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`}
                ></div>

                {(hasSubmenu || showvideoArt) && (
                  <div
                    className={`absolute right-2 top-1/2 -translate-y-1/2 transition-transform duration-200 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  ></div>
                )}
              </button>

              {hasSubmenu && expanded === item.id && (
                <div
                  onMouseLeave={() => {
                    setExpanded(null)
                    setHoveredItem(null)
                  }}
                  className="absolute left-full top-0 ml-2 w-56 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-sm z-50 animate-in fade-in slide-in-from-left-2 duration-200"
                >
                  {/* Submenu Header */}
                  <div className="px-4 py-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Icon className="w-4 h-4 text-purple-400" />
                      {item.label}
                    </h3>
                  </div>

                  <div className="py-2">
                    {item.submenu.map((subitem, idx) => {
                      const SubIcon = subitem.icon
                      return (
                        <button
                          key={subitem.id}
                          onClick={() => console.log('Clicked:', subitem.label)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 transition-all duration-150 group/item"
                          style={{
                            animation: `slideInMenu 0.3s ease-out ${idx * 0.05}s both`,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#292929')}
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                          }
                        >kkk
                          {/* <SubIcon className="w-4 h-4 text-gray-600 group-hover/item:text-purple-400 transition-colors" /> */}
                          <span className="flex-1 text-left">{subitem.label}</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover/item:bg-purple-500 transition-colors opacity-0 group-hover/item:opacity-100" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {showvideoArt && expanded === item.id && (
                <div
                  onMouseLeave={() => {
                    setExpanded(null)
                    setHoveredItem(null)
                  }}
                  className="absolute left-full top-0 ml-3 w-[520px] rounded-2xl 
  bg-[#111111]/90 backdrop-blur-xl border border-white/10 
  shadow-2xl shadow-black/60 z-50 
  animate-in fade-in slide-in-from-left-2 duration-200"
                >
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-white/10">
                    <h2 className="text-[15px] font-semibold text-white">ImagineArt Apps</h2>
                  </div>

                  {/* Content */}
                  <div className="p-6 grid grid-cols-2 gap-10">
                    {/* LEFT - Image Tools */}
                    <div>
                      <h3 className="text-[12px] text-gray-400 mb-4">Image Tools</h3>

                      <div className="space-y-3">
                        {videoToolsData.videoTools.map((tool, idx) => {
                          const ToolIcon = tool.icon

                          return (
                            <button
                              key={tool.id}
                              className="w-full flex items-start gap-3 p-2 rounded-lg 
              transition-all duration-200 
              hover:bg-white/5"
                              style={{
                                animation: `slideInMenu 0.25s ease-out ${idx * 0.04}s both`,
                              }}
                            >
                              {/* Icon */}
                              <div
                                className="w-9 h-9 flex items-center justify-center 
              rounded-md bg-white/5 border border-white/10"
                              >
                                <ToolIcon className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                              </div>

                              {/* Text */}
                              <div className="text-left">
                                <h4 className="text-[13px] font-medium text-white leading-none mb-1">
                                  {tool.title}
                                </h4>
                                <p className="text-[11px] text-gray-400 leading-snug">
                                  {tool.description}
                                </p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* RIGHT - Video Tools */}
                    <div>
                      <h3 className="text-[12px] text-gray-400 mb-4">Video tools</h3>

                      <div className="space-y-3">
                        {videoToolsData.models.map((tool, idx) => {
                          const ToolIcon = tool.icon

                          return (
                             <button
                              key={tool.id}
                              className="w-full flex items-start gap-3 p-2 rounded-lg 
              transition-all duration-200 
              hover:bg-white/5"
                              style={{
                                animation: `slideInMenu 0.25s ease-out ${idx * 0.04}s both`,
                              }}
                            >
                              {/* Icon */}
                              <div
                                className="w-9 h-9 flex items-center justify-center 
              rounded-md bg-white/5 border border-white/10"
                              >
                                <ToolIcon className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                              </div>

                              {/* Text */}
                              <div className="text-left">
                                <h4 className="text-[13px] font-medium text-white leading-none mb-1">
                                  {tool.title}
                                </h4>
                                <p className="text-[11px] text-gray-400 leading-snug">
                                  {tool.description}
                                </p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
        </div>