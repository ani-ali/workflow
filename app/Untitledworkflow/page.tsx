"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Upload, Type, Image as ImageIcon, Video, 
  Sparkles, Mic, Music, Search,
  Square, File, Plus, Columns
} from 'lucide-react';

// --- SUB-COMPONENTS ---
function NodeItem({ icon, label, shortcut, badge, variant }: { icon: React.ReactNode, label: string, shortcut?: string, badge?: string, variant?: string }) {
  const variants = {
    upload: "from-[#3a3a3a] to-[#222222] border-t-white/10",
    text: "from-[#3b597d] to-[#253547] border-t-white/20",
    image: "from-[#8a6e2d] to-[#4d3d1a] border-t-white/20",
    video: "from-[#4d6b46] to-[#2d3d28] border-t-white/20",
    copilot: "from-[#3b6b8a] to-[#254154] border-t-white/20",
    voice: "from-[#8a3b59] to-[#542535] border-t-white/20",
    music: "from-[#5c3b8a] to-[#382554] border-t-white/20",
  };
  const gradientClass = variant ? (variants as any)[variant] : "bg-white/5 border-white/5";
  return (
    <button className="w-full flex items-center gap-3 px-1 py-1 rounded-xl hover:bg-white/[0.04] transition-all group outline-none text-left">
      <div className={`relative w-7 h-7 flex items-center justify-center rounded-[10px] bg-gradient-to-b border border-black/40 shadow-lg ${gradientClass}`}>
        <div className="absolute inset-0 border-t border-white/10 rounded-[10px] pointer-events-none" />
        <div className="text-white/90 drop-shadow-sm">{React.cloneElement(icon as React.ReactElement, { size: 18, strokeWidth: 1.8 })}</div>
      </div>
      <span className="text-[14px] font-medium flex-1 text-zinc-300 group-hover:text-white">{label}</span>
      {badge && <span className="text-[9px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-[4px] uppercase font-bold mr-1">{badge}</span>}
      <span className="text-[11px] text-zinc-600 font-medium group-hover:text-zinc-400 min-w-[28px] text-right">{shortcut}</span>
    </button>
  );
}

function IconButton({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 group transition-colors ${active ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
      <div className={`p-2 rounded-xl transition-all ${active ? 'bg-white/10' : 'group-hover:bg-white/5'}`}>{icon}</div>
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );
}

// --- MAIN COMPONENT ---

export default function NodeEditor() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [projectName, setProjectName] = useState("dddddd"); // Matches your image
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div className="flex h-screen w-full bg-[#000000] text-zinc-300 font-sans overflow-hidden">
      
      {/* LEFT NAVIGATION STRIP */}
      <aside className="w-[72px] flex flex-col items-center py-4  border-r border-white/5 bg-[#080808] z-30">
        <div className="mb-5 border-b border-white/5 w-full flex justify-center pb-3">
        
         <Image src="/floww.png" alt="Logo"  width={'25'} height={'25'}/>
        </div>
        <nav className="flex flex-col gap-2 items-center flex-1">
          <IconButton icon={<File size={20} />} label="Content" />
          <IconButton 
            icon={<Plus size={20} />} 
            label="Nodes" 
            active={isSidebarOpen} 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          />
          <IconButton icon={<Search size={20} />} label="Search" />
        </nav>
      </aside>

      {/* EXPANDABLE NODES SIDEBAR */}
      {isSidebarOpen && (
        <aside className="w-[300px] bg-[#0c0c0c] border-r border-white/5 flex flex-col animate-in slide-in-from-left duration-300 ease-out">
          {/* SYNCED PROJECT NAME HEADER */}
          <div className="h-[55px] flex items-center justify-between px-5 border-b border-white/5">
            {isEditing ? (
              <input
                ref={inputRef}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                className="bg-transparent text-[18px] font-bold text-white outline-none w-full border border-white/10 rounded-xl mr-2"
              />
            ) : (
              <h1 
                onClick={() => setIsEditing(true)}
                className="text-[18px] font-bold text-white tracking-tight  cursor-pointer hover:opacity-80 transition-opacity"
              >
                {projectName}
              </h1>
            )}
            
            {/* Sidebar Toggle Icon like in your image */}
            <div 
              className=" border-white/10 bg-white/5 cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Columns size={16} className="text-zinc-400 rotate-180" />
            </div>
          </div>

          <div className="p-4 mt-3 pt-0 flex-1 overflow-y-auto no-scrollbar">
            {/* "Nodes" Title exactly as requested */}
            <h2 className="text-[15px] font-bold text-white mb-4">Nodes</h2>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={15} />
              <input type="text" placeholder="Search nodes or models" className="w-full  border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[13px] focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-700" />
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 px-1">Add</p>
              <NodeItem icon={<Upload />} label="Upload" shortcut="U" variant="upload" />
              <NodeItem icon={<Type />} label="Prompt" shortcut="T/P" variant="text" />
              <NodeItem icon={<ImageIcon />} label="Image" shortcut="I" variant="image" />
              <NodeItem icon={<Video />} label="Video" shortcut="V" variant="video" />
              <NodeItem icon={<Sparkles />} label="Copilot" shortcut="C" variant="copilot" />
              <NodeItem icon={<Mic />} label="Voice" shortcut="A" variant="voice" />
              <NodeItem icon={<Music />} label="Music" shortcut="M" variant="music" badge="New" />
            </div>
          </div>
        </aside>
      )}

      {/* MAIN CANVAS AREA */}
      <main className="flex-1 relative bg-[#050505]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        {/* SYNCED FLOATING TOOLBAR */}
        <div className="absolute top-6 left-8 flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-full shadow-2xl">
          <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
            <Sparkles size={14} className="text-black" />
          </div>

          <span 
            onClick={() => setIsEditing(true)}
            className="text-sm font-semibold text-white tracking-tight cursor-pointer hover:text-zinc-300"
          >
            {projectName}
          </span>

          <div className="w-px h-4 bg-white/10 mx-1" />
          
          <div className="flex items-center gap-2 text-zinc-500 hover:text-white cursor-pointer transition-colors">
            <Square size={14} />
            <div className="w-[10px] h-[14px] border-r border-t border-b border-current rounded-r-sm" />
          </div>
        </div>
      </main>
    </div>
  );
}